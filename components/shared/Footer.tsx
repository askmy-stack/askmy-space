import { X_ACCOUNT } from '@/lib/constants';

export const Footer = () => {
  return (
    <footer className="border-t border-current border-opacity-20 mt-12 py-8 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-sm opacity-60">
          © {new Date().getFullYear()} Abhinaysai Kamineni. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href={X_ACCOUNT} target="_blank" rel="noopener noreferrer" className="text-sm hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md px-2 py-1">
            X
          </a>
          <a href="https://github.com/askmy-stack" target="_blank" rel="noopener noreferrer" className="text-sm hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md px-2 py-1">
            GitHub
          </a>
          <a href="mailto:kamineniabhinaysai@gmail.com" className="text-sm hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md px-2 py-1">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};
