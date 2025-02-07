import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X as CloseIcon, Share2 } from 'lucide-react';
import { useProject } from '../hooks/useProject';
import { getImageColor } from '../lib/utils';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { project, loading } = useProject(slug);
  const navigate = useNavigate();
  const [imageColor, setImageColor] = useState<string>('');

  useEffect(() => {
    if (project?.image_url) {
      getImageColor(project.image_url).then(setImageColor);
    }
  }, [project?.image_url]);

  const handleFilter = (type: 'client' | 'year' | 'tag', value: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set(type, value);
    navigate(`/?${searchParams.toString()}`);
  };

  const handleShare = async () => {
    if (!project) return;

    const shareData = {
      title: project.title,
      text: project.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard copy if native sharing is not available
        await navigator.clipboard.writeText(window.location.href);
        // You might want to show a toast notification here
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-foreground"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-title-2 mb-4">Project not found</h1>
        <Link to="/" className="text-body opacity-60 hover:opacity-100 transition-opacity inline-flex items-center gap-2">
          <CloseIcon size={20} />
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="lg:pt-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <Link
          to="/"
          className="fixed top-8 right-8 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-background/90 backdrop-blur-sm text-foreground hover:bg-background/80 dark:bg-background/90 dark:text-foreground dark:hover:bg-background transition-colors"
        >
          <CloseIcon size={20} />
        </Link>

        <div className="relative">
          <div className="md:aspect-[21/9] aspect-[3/4] w-full">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div 
              className="absolute inset-0"
              style={{
                background: imageColor 
                  ? `linear-gradient(to top, ${imageColor}99 0%, ${imageColor}00 100%)`
                  : 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)'
              }}
            />
          </div>
          
          <div className="absolute inset-x-0 bottom-0 p-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-title-2 md:text-title-1 text-white mb-2">{project.title}</h1>
              <p className="text-callout md:text-body text-white/90 max-w-2xl leading-relaxed">{project.description}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleFilter('client', project.client)}
                className="px-3 py-1 bg-border rounded-full text-footnote hover:opacity-80 transition-opacity"
              >
                {project.client}
              </button>
              <button
                onClick={() => handleFilter('year', project.year)}
                className="px-3 py-1 bg-border rounded-full text-footnote hover:opacity-80 transition-opacity"
              >
                {project.year}
              </button>
              <button
                onClick={() => handleFilter('tag', project.role)}
                className="px-3 py-1 bg-border rounded-full text-footnote hover:opacity-80 transition-opacity"
              >
                {project.role}
              </button>
              {project.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleFilter('tag', tag)}
                  className="px-3 py-1 bg-border rounded-full text-footnote hover:opacity-80 transition-opacity"
                >
                  {tag}
                </button>
              ))}
            </div>

            {project.link && (
              <div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-foreground text-background rounded-lg text-callout hover:opacity-90 transition-opacity"
                >
                  View Project
                </a>
              </div>
            )}
          </div>

          <div className="prose max-w-none text-body mt-8" dangerouslySetInnerHTML={{ __html: project.content }} />

          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.gallery.map((image, index) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${project.title} gallery image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-24 flex justify-center">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-6 py-3 text-foreground border border-border rounded-lg text-callout hover:bg-border/10 transition-colors"
              aria-label="Share project"
            >
              <Share2 size={20} className="opacity-60" />
              <span className="opacity-60">Share</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
