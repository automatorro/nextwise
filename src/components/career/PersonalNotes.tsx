import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUserNotes, UserNote } from '@/hooks/useUserNotes';
import { Plus, Search, Filter, FileText, Brain, Calendar, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';

const PersonalNotes: React.FC = () => {
  const { notes, isLoading, createNote, updateNote, deleteNote } = useUserNotes();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedNote, setSelectedNote] = useState<UserNote | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    note_type: 'ai_analysis',
    test_type: '',
    tags: [] as string[]
  });

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || note.note_type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleCreateNote = () => {
    createNote.mutate(newNote, {
      onSuccess: () => {
        setIsCreateModalOpen(false);
        setNewNote({
          title: '',
          content: '',
          note_type: 'ai_analysis',
          test_type: '',
          tags: []
        });
      }
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ai_analysis': return <Brain className="h-4 w-4" />;
      case 'manual': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'ai_analysis': return 'Analiză AI';
      case 'manual': return 'Notă personală';
      default: return 'Notă';
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Se încarcă notele...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Notele mele personale</h2>
          <p className="text-muted-foreground">
            Salvează și organizează analizele AI și notele personale
          </p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Notă nouă
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Creează o notă nouă</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Titlul notei"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
              <Textarea
                placeholder="Conținutul notei"
                rows={6}
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              />
              <div className="flex gap-4">
                <Button onClick={handleCreateNote} disabled={!newNote.title || !newNote.content}>
                  Salvează nota
                </Button>
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Anulează
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Caută în note..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('all')}
          >
            Toate
          </Button>
          <Button
            variant={filterType === 'ai_analysis' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('ai_analysis')}
          >
            <Brain className="h-4 w-4 mr-1" />
            Analize AI
          </Button>
          <Button
            variant={filterType === 'manual' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('manual')}
          >
            <FileText className="h-4 w-4 mr-1" />
            Note personale
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(note.note_type)}
                  <CardTitle className="text-sm font-medium line-clamp-2">
                    {note.title}
                  </CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNote(note);
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote.mutate(note.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {getTypeLabel(note.note_type)}
                </Badge>
                {note.test_type && (
                  <Badge variant="outline" className="text-xs">
                    {note.test_type}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                {note.content}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {format(new Date(note.created_at), 'dd MMM yyyy', { locale: ro })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <FileText className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">Nu ai încă note salvate</h3>
            <p className="text-muted-foreground">
              Creează prima ta notă sau salvează o analiză AI din rezultatele testelor
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PersonalNotes;