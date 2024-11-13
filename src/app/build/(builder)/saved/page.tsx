import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Calendar,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Settings,
  Share2
} from 'lucide-react';
import Link from 'next/link';

const SavedBuildsList = () => {
  // Mock data - replace with actual data fetching
  const user = {
    name: "John Doe",
    builds: 5,
    lastActive: "2024-11-13",
    avatar: "/api/placeholder/32/32"
  };

  const builds = [
    {
      id: 1,
      name: "Gaming Build 2024",
      totalPrice: 2499.99,
      totalWattage: 750,
      components: 9,
      lastUpdated: "2024-11-12",
      isShared: true
    },
    {
      id: 2,
      name: "Streaming PC",
      totalPrice: 1899.99,
      totalWattage: 650,
      components: 8,
      lastUpdated: "2024-11-10",
      isShared: false
    },
    {
      id: 3,
      name: "Budget Build",
      totalPrice: 899.99,
      totalWattage: 450,
      components: 9,
      lastUpdated: "2024-11-08",
      isShared: false
    }
  ];

  return (
    <div className="container mx-auto p-6">
      {/* User Profile Section */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt="User avatar"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <span>{user.builds} builds</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Last active {user.lastActive}
                  </span>
                </div>
              </div>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Build
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Builds List Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your PC Builds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {builds.map((build) => (
              <Link href={"/build/saved/" + build.id} key={build.id}>
              <div key={build.id} className="group">
                <div className="flex items-center justify-between p-4 rounded-lg border group-hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Settings className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{build.name}</h3>
                        {build.isShared && (
                          <Badge variant="secondary" className="text-xs">
                            <Share2 className="w-3 h-3 mr-1" />
                            Shared
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        <span>${build.totalPrice.toFixed(2)}</span>
                        <span>•</span>
                        <span>{build.totalWattage}W</span>
                        <span>•</span>
                        <span>{build.components}/9 components</span>
                        <span>•</span>
                        <span>Updated {build.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </Button>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>

          {builds.length === 0 && (
            <div className="text-center py-12">
              <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No builds yet</h3>
              <p className="text-gray-500">Start creating your first PC build!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SavedBuildsList;