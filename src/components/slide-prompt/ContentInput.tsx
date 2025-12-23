import { useState } from 'react';
import { FileText, Link, MessageSquare, Tag, Upload, X, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { extractUrl } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import type { ContentInput as ContentInputType, ContentInputType as InputType } from '@/types/slidePrompt';

const topics = [
  'Business Strategy',
  'Product Launch',
  'Quarterly Report',
  'Team Introduction',
  'Technology Overview',
  'Market Analysis',
  'Project Proposal',
  'Training Session',
  'Sales Pitch',
  'Company Culture',
  'Research Findings',
  'Event Presentation'
];

interface ContentInputProps {
  value: ContentInputType;
  onChange: (value: ContentInputType) => void;
}

export function ContentInput({ value, onChange }: ContentInputProps) {
  const [activeTab, setActiveTab] = useState<InputType>(value.type);
  const [isExtracting, setIsExtracting] = useState(false);
  const { toast } = useToast();

  const handleTabChange = (tab: string) => {
    const newType = tab as InputType;
    setActiveTab(newType);
    onChange({ ...value, type: newType });
  };

  const handleTextChange = (text: string) => {
    onChange({ ...value, text });
  };

  const handleTopicChange = (topic: string) => {
    onChange({ ...value, topic });
  };

  const handleUrlChange = (url: string) => {
    onChange({ ...value, url, urlContent: '' });
  };

  const handleExtractUrl = async () => {
    if (!value.url) return;

    setIsExtracting(true);
    try {
      const result = await extractUrl(value.url);
      if (result.success && result.data) {
        onChange({
          ...value,
          urlContent: result.data.content,
        });
        toast({
          title: 'Content Extracted',
          description: `Extracted ${result.data.content.length} characters from "${result.data.title || 'the page'}"`,
        });
      } else {
        toast({
          title: 'Extraction Failed',
          description: result.error || 'Could not extract content from URL',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Extraction Failed',
        description: error instanceof Error ? error.message : 'Failed to connect to server',
        variant: 'destructive',
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const clearUrlContent = () => {
    onChange({ ...value, urlContent: '' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onChange({
        ...value,
        fileName: file.name,
        fileContent: content.slice(0, 5000) // Limit content size
      });
    };
    reader.readAsText(file);
  };

  const clearFile = () => {
    onChange({ ...value, fileName: '', fileContent: '' });
  };

  return (
    <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Prompt</span>
            </TabsTrigger>
            <TabsTrigger value="topic" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span className="hidden sm:inline">Topic</span>
            </TabsTrigger>
            <TabsTrigger value="file" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">File</span>
            </TabsTrigger>
            <TabsTrigger value="url" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              <span className="hidden sm:inline">URL</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Enter your prompt
              </label>
              <Textarea
                placeholder="Describe what you want in your slides. You can also add content from Topic, File, or URL tabs - all sources will be combined!"
                value={value.text}
                onChange={(e) => handleTextChange(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              <p className="text-xs text-muted-foreground">
                {value.text.length} characters
              </p>
            </div>
          </TabsContent>

          <TabsContent value="topic" className="mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Select a topic
              </label>
              <Select value={value.topic} onValueChange={handleTopicChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a presentation topic..." />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {value.topic && (
                <p className="text-sm text-muted-foreground mt-2">
                  The AI will generate content based on the "{value.topic}" theme.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="file" className="mt-4">
            <div className="space-y-4">
              <label className="text-sm font-medium text-foreground">
                Upload a document
              </label>
              {value.fileName ? (
                <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-accent-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{value.fileName}</p>
                      <p className="text-xs text-muted-foreground">
                        {value.fileContent.length} characters extracted
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={clearFile}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    TXT, MD, or other text files
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept=".txt,.md,.markdown"
                    onChange={handleFileUpload}
                  />
                </label>
              )}
            </div>
          </TabsContent>

          <TabsContent value="url" className="mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Enter a URL
                </label>
                <div className="flex gap-2">
                  <Input
                    type="url"
                    placeholder="https://example.com/article"
                    value={value.url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleExtractUrl}
                    disabled={!value.url || isExtracting}
                    variant="secondary"
                  >
                    {isExtracting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Extracting...
                      </>
                    ) : (
                      'Extract'
                    )}
                  </Button>
                </div>
              </div>

              {value.urlContent ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span>Content extracted successfully</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={clearUrlContent}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-3 bg-accent rounded-lg max-h-40 overflow-y-auto">
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {value.urlContent.slice(0, 500)}
                      {value.urlContent.length > 500 && '...'}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {value.urlContent.length} characters extracted
                  </p>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Click "Extract" to fetch and analyze the content from the URL.
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
