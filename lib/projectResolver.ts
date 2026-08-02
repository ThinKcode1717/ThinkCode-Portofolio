import { Project, THINKCODE_DATA } from './data';

export interface DynamicProjectItem {
  id: string;
  category: string;
  year: string;
  metrics?: string;
  screenshots?: string[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  idPayload: {
    title: string;
    description: string;
    longDescription: string;
    businessImpact?: string;
  };
  enPayload: {
    title: string;
    description: string;
    longDescription: string;
    businessImpact?: string;
  };
}

// Converts dynamic project item to localized Project format
export function formatDynamicProject(item: DynamicProjectItem, lang: 'id' | 'en' = 'id'): Project {
  const payload = lang === 'en' ? item.enPayload || item.idPayload : item.idPayload || item.enPayload;
  
  return {
    id: item.id,
    title: payload.title || item.id,
    category: item.category || 'Web Apps',
    year: item.year || '2026',
    metrics: item.metrics || 'Production Ready',
    description: payload.description || '',
    longDescription: payload.longDescription || payload.description || '',
    businessImpact: payload.businessImpact || '',
    image: item.screenshots && item.screenshots.length > 0 ? item.screenshots[0] : '/images/projects/placeholder.png',
    featured: true,
    screenshots: item.screenshots && item.screenshots.length > 0 ? item.screenshots : undefined,
    tags: item.tags || [],
    githubUrl: item.githubUrl || undefined,
    liveUrl: item.liveUrl || undefined
  };
}

// Merges static THINKCODE_DATA.projects with dynamic CMS projects
export function getMergedProjects(dynamicProjects: DynamicProjectItem[] = [], lang: 'id' | 'en' = 'id'): Project[] {
  const staticProjects = THINKCODE_DATA.projects.map((p) => {
    // If static project is localized in translations.ts, use it as fallback
    return p;
  });

  const formattedDynamic = dynamicProjects.map((dp) => formatDynamicProject(dp, lang));

  // Dynamic projects placed first (newest additions)
  return [...formattedDynamic, ...staticProjects];
}
