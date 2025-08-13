
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, FileText, Briefcase, TrendingUp, Copy, Mail } from 'lucide-react';

interface CVAnalysisResult {
  matchScore: number;
  keywordAnalysis: {
    found: string[];
    missing: string[];
  };
  sectionFeedback: Array<{
    section: string;
    feedback: string;
  }>;
  rewriteSuggestions: Array<{
    original: string;
    suggestion: string;
  }>;
}

const CVAnalyzerPage = () => {
  const { t } = useLanguage();
  const [cvText, setCvText] = useState('');
  const [jobDescriptionText, setJobDescriptionText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CVAnalysisResult | null>(null);
  const [isOptimizingCV, setIsOptimizingCV] = useState(false);
  const [optimizedCV, setOptimizedCV] = useState<string | null>(null);
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!cvText.trim() || !jobDescriptionText.trim()) {
      toast.error(t('common.error'), {
        description: 'Please provide both CV text and job description.'
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-cv', {
        body: {
          cvText: cvText.trim(),
          jobDescriptionText: jobDescriptionText.trim()
        }
      });

      if (error) {
        console.error('Error calling analyze-cv function:', error);
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setAnalysisResult(data);
      toast.success('Analysis completed successfully!');
      
    } catch (error) {
      console.error('CV Analysis error:', error);
      toast.error('Analysis failed', {
        description: 'Unable to analyze CV. Please try again later.'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleOptimizeCV = async () => {
    if (!cvText.trim() || !jobDescriptionText.trim()) {
      return;
    }

    setIsOptimizingCV(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('rewrite-cv', {
        body: {
          cvText: cvText.trim(),
          jobDescriptionText: jobDescriptionText.trim(),
          analysisResult: analysisResult
        }
      });

      if (error) {
        console.error('Error calling rewrite-cv function:', error);
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setOptimizedCV(data.optimizedCV);
      toast.success('CV optimized successfully!');
      
    } catch (error) {
      console.error('CV optimization error:', error);
      toast.error(t('cvOptimization.optimizationFailed'), {
        description: 'Unable to optimize CV. Please try again later.'
      });
    } finally {
      setIsOptimizingCV(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!cvText.trim() || !jobDescriptionText.trim()) {
      return;
    }

    setIsGeneratingCoverLetter(true);
    
    try {
      const cvToUse = optimizedCV || cvText.trim();
      
      const { data, error } = await supabase.functions.invoke('generate-cover-letter', {
        body: {
          cvText: cvToUse,
          jobDescriptionText: jobDescriptionText.trim()
        }
      });

      if (error) {
        console.error('Error calling generate-cover-letter function:', error);
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setCoverLetter(data.coverLetter);
      toast.success('Cover letter generated successfully!');
      
    } catch (error) {
      console.error('Cover letter generation error:', error);
      toast.error(t('cvOptimization.coverLetterFailed'), {
        description: 'Unable to generate cover letter. Please try again later.'
      });
    } finally {
      setIsGeneratingCoverLetter(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t('cvOptimization.copiedToClipboard'));
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('cvOptimization.title')}</h1>
        <p className="text-gray-600">
          {t('cvOptimization.description')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              CV Text
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste your CV content here..."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              className="min-h-[300px] resize-none"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-green-600" />
              Job Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste the job description here..."
              value={jobDescriptionText}
              onChange={(e) => setJobDescriptionText(e.target.value)}
              className="min-h-[300px] resize-none"
            />
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button
          onClick={handleAnalyze}
          disabled={!cvText.trim() || !jobDescriptionText.trim() || isAnalyzing}
          size="lg"
          className="px-8"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <TrendingUp className="w-4 h-4 mr-2" />
              {t('cvOptimization.startAnalysis')}
            </>
          )}
        </Button>
      </div>

      {analysisResult && (
        <div className="space-y-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Match Score */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-2">
                  <span className="text-2xl font-bold text-blue-600">
                    {analysisResult.matchScore}%
                  </span>
                </div>
                <p className="text-gray-600">Match Score</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleOptimizeCV}
                  disabled={isOptimizingCV}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  {isOptimizingCV ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('cvOptimization.optimizingCV')}
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4" />
                      {t('cvOptimization.optimizeCV')}
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleGenerateCoverLetter}
                  disabled={isGeneratingCoverLetter}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  {isGeneratingCoverLetter ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('cvOptimization.generatingCoverLetter')}
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      {t('cvOptimization.generateCoverLetter')}
                    </>
                  )}
                </Button>
              </div>

              {/* Keywords Analysis */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">Keywords Found</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.keywordAnalysis.found.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">Missing Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.keywordAnalysis.missing.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section Feedback */}
              <div>
                <h4 className="font-semibold mb-3">Section Feedback</h4>
                <div className="space-y-3">
                  {analysisResult.sectionFeedback.map((item, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h5 className="font-medium text-gray-900">{item.section}</h5>
                      <p className="text-gray-600 text-sm">{item.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rewrite Suggestions */}
              <div>
                <h4 className="font-semibold mb-3">Improvement Suggestions</h4>
                <div className="space-y-4">
                  {analysisResult.rewriteSuggestions.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="mb-2">
                        <span className="text-sm font-medium text-red-600">Original:</span>
                        <p className="text-sm text-gray-700 italic">"{item.original}"</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-green-600">Suggestion:</span>
                        <p className="text-sm text-gray-700">"{item.suggestion}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Optimized CV Results */}
      {optimizedCV && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t('cvOptimization.optimizedCV')}
              <Button
                onClick={() => copyToClipboard(optimizedCV)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {t('cvOptimization.copyToClipboard')}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm font-mono">{optimizedCV}</pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cover Letter Results */}
      {coverLetter && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t('cvOptimization.coverLetter')}
              <Button
                onClick={() => copyToClipboard(coverLetter)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {t('cvOptimization.copyToClipboard')}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm">{coverLetter}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CVAnalyzerPage;
