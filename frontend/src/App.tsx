import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">
                School SaaS Application
              </h1>
            </div>
          </header>
          
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                      Welcome to School Management System
                    </h2>
                    <p className="text-gray-600 mb-6">
                      A comprehensive SaaS solution for ICSE & CBSE schools
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-blue-900 mb-2">
                          Multi-Role Support
                        </h3>
                        <p className="text-sm text-blue-700">
                          Teachers, Students, Parents, Principal & Finance
                        </p>
                      </div>
                      
                      <div className="bg-green-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-green-900 mb-2">
                          Complete Management
                        </h3>
                        <p className="text-sm text-green-700">
                          Attendance, Results, Meetings & Finance
                        </p>
                      </div>
                      
                      <div className="bg-purple-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-purple-900 mb-2">
                          Real-time Updates
                        </h3>
                        <p className="text-sm text-purple-700">
                          Live notifications & meeting support
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

