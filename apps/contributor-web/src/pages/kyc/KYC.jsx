import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export default function KYC() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1) setStep(2);
    else navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-slate-900">
            Identity Verification
          </h1>
          <p className="mt-2 text-slate-600">
            We need to verify your identity before you can start selling.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-500'}`}
            >
              1
            </div>
            <div
              className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-primary-600' : 'bg-slate-200'}`}
            ></div>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-500'}`}
            >
              2
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm font-medium text-slate-600">
            <span>Personal Details</span>
            <span>Document Upload</span>
          </div>
        </div>

        <Card className="p-8">
          {step === 1 ? (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input label="First Name" placeholder="Jane" />
                <Input label="Last Name" placeholder="Doe" />
                <Input label="Date of Birth" type="date" />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <Input label="Address Line 1" placeholder="123 Main St" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <Input label="City" placeholder="New York" />
                <Input label="State" placeholder="NY" />
                <Input label="ZIP / Postal Code" placeholder="10001" />
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:border-primary-500 transition-colors cursor-pointer bg-slate-50">
                <div className="mx-auto h-12 w-12 text-slate-400">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 7v6m0 0l-3-3m3 3l3-3m-8 14h16a2 2 0 002-2V7a2 2 0 00-2-2h-3.172a2 2 0 01-1.414-.586l-2.414-2.414A2 2 0 0010.172 2H7.828a2 2 0 00-1.414.586L3.999 5.414A2 2 0 012.586 6H2a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="mt-2 text-sm font-medium text-slate-900">
                  Upload Government ID
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  PNG, JPG, PDF up to 10MB
                </p>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:border-primary-500 transition-colors cursor-pointer bg-slate-50">
                <div className="mx-auto h-12 w-12 text-slate-400">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mt-2 text-sm font-medium text-slate-900">
                  Take a Selfie
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  To match with your ID
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <Button onClick={handleNext}>
              {step === 1 ? 'Next Step' : 'Submit for Review'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
