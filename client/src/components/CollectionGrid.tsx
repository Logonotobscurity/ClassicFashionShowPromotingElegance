import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  { id: 'all', label: 'All Collections' },
  { id: 'classic', label: 'Classic' },
  { id: 'contemporary', label: 'Contemporary' }
];

// Available collection images categorized by style
const collections = {
  classic: ['collection 1.webp', 'collection3.webp'],
  contemporary: ['collection2.jpeg', 'collection6.webp', 'collection7.webp', 'collection8.webp']
};

export default function CollectionGrid() {
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredImages = () => {
    if (activeTab === 'all') {
      return Object.values(collections).flat();
    }
    return collections[activeTab as keyof typeof collections] || [];
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="px-6 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {getFilteredImages().map((image, index) => (
                <Card key={index} className="overflow-hidden group">
                  <div className="aspect-[3/4] relative">
                    <img
                      src={`/${image}`}
                      alt={`Fashion collection item ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
