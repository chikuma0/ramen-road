'use client';

import { FC } from 'react';
import { Certificate as CertificateType } from '../../types/gamification';
import { Card, CardContent } from '../shared/Card';

interface CertificateProps {
  certificate: CertificateType;
  journeyName: string;
}

const Certificate: FC<CertificateProps> = ({ certificate, journeyName }) => {
  return (
    <Card className="relative overflow-hidden">
      {/* Certificate Border */}
      <div className="absolute inset-0 border-8 border-amber-500/20 pointer-events-none" />
      
      <CardContent className="p-8">
        {/* Certificate Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-serif text-amber-800 mb-2">Certificate of Completion</h3>
          <p className="text-gray-600">This is to certify that</p>
          <p className="text-xl font-medium mt-2">[User Name]</p>
          <p className="text-gray-600 mt-1">has successfully completed</p>
          <p className="text-2xl font-serif text-amber-800 mt-2">{journeyName}</p>
        </div>

        {/* Certificate Details */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <p className="text-sm text-gray-600">Completion Date</p>
            <p className="font-medium">
              {new Date(certificate.completedAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Certificate ID</p>
            <p className="font-medium">{certificate.id}</p>
          </div>
        </div>

        {/* Taste Insights */}
        <div className="mb-8">
          <h4 className="text-lg font-medium mb-3">Taste Insights</h4>
          <div className="space-y-2">
            {certificate.tasteInsights.map((insight, index) => (
              <div key={index} className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <p className="text-gray-700">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Footer */}
        <div className="text-center text-sm text-gray-600">
          <p>This certificate is proof of your dedication to the art of ramen appreciation.</p>
          <p className="mt-2">Verified by Ramen Road</p>
        </div>

        {/* Certificate Image */}
        {certificate.certificateImageUrl && (
          <div className="mt-6">
            <img
              src={certificate.certificateImageUrl}
              alt="Certificate"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Certificate; 