
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Users, Target, Clock, Lightbulb } from "lucide-react";

export const HEXACOExplanation = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Testul HEXACO
          </CardTitle>
          <CardDescription>
            Modelul HEXACO de personalitate evaluează 6 dimensiuni fundamentale ale personalității umane
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Testul HEXACO este un model modern de personalitate care extinde modelul tradițional Big Five 
            prin adăugarea dimensiunii Onestitate-Umilință și prin redefinirea altor dimensiuni pentru 
            o evaluare mai precisă a personalității.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="font-medium">Onestitate-Umilință (H)</span>
              </div>
              <p className="text-sm text-gray-600">
                Evaluează sinceritatea, echitatea, evitarea lăcomiei și modestia în relațiile interpersonale.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-purple-500" />
                <span className="font-medium">Emotivitate (E)</span>
              </div>
              <p className="text-sm text-gray-600">
                Măsoară tendința de a experimenta anxietate, vulnerabilitate și empatie emoțională.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Extraversiune (X)</span>
              </div>
              <p className="text-sm text-gray-600">
                Reflectă sociabilitatea, energia socială și tendința de a fi activ în grupuri.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-green-500" />
                <span className="font-medium">Agreabilitate (A)</span>
              </div>
              <p className="text-sm text-gray-600">
                Evaluează răbdarea, toleranța și tendința de a evita conflictele cu ceilalți.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-500" />
                <span className="font-medium">Conștiinciozitate (C)</span>
              </div>
              <p className="text-sm text-gray-600">
                Măsoară organizarea, disciplina și tendința de a fi metodic și perseverent.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">Deschidere (O)</span>
              </div>
              <p className="text-sm text-gray-600">
                Reflectă curiositatea intelectuală, creativitatea și aprecierea pentru frumusețe.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Despre Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">60</div>
              <div className="text-sm text-gray-600">Întrebări</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">~20</div>
              <div className="text-sm text-gray-600">minute</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">6</div>
              <div className="text-sm text-gray-600">Dimensiuni</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Avantajele modelului HEXACO:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Evaluează aspecte ale personalității neglijate de modelul Big Five</li>
              <li>• Oferă o perspectivă culturală mai largă asupra personalității</li>
              <li>• Dimensiunea Onestitate-Umilință prezice comportamente etice</li>
              <li>• Validare științifică extinsă în multiple culturi</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interpretarea Rezultatelor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Badge variant="secondary">0-25%: Scăzut</Badge>
              <Badge variant="outline">26-50%: Mediu-scăzut</Badge>
              <Badge variant="outline">51-75%: Mediu-ridicat</Badge>
              <Badge variant="default">76-100%: Ridicat</Badge>
            </div>
            
            <p className="text-sm text-gray-600">
              Fiecare dimensiune este evaluată independent și reflectă tendințele tale naturale 
              în diferite situații. Nu există scoruri "bune" sau "rele" - fiecare profil de 
              personalitate are avantajele și provocările sale.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
