
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Shield } from 'lucide-react';

interface ProfileInfoCardProps {
  fullName?: string;
  email?: string;
  isAdmin: boolean;
  createdAt?: string;
}

const ProfileInfoCard = ({ fullName, email, isAdmin, createdAt }: ProfileInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="w-5 h-5 mr-2" />
          Informații Profil
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Nume</label>
            <p className="text-gray-900">{fullName || 'Nu este setat'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <p className="text-gray-900">{email}</p>
          </div>
          {isAdmin && (
            <div>
              <label className="text-sm font-medium text-gray-600">Rol</label>
              <div className="flex items-center space-x-2 mt-1">
                <Shield className="w-4 h-4 text-red-600" />
                <span className="text-red-600 font-medium">Administrator</span>
              </div>
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-gray-600">Membru din</label>
            <p className="text-gray-900">
              {createdAt 
                ? new Date(createdAt).toLocaleDateString('ro-RO')
                : 'Nu este disponibil'
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInfoCard;
