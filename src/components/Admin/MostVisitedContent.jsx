import React, { useEffect, useState } from 'react';

const MostVisitedContent = () => {
  const [mostVisitedContent, setMostVisitedContent] = useState([]);

  useEffect(() => {
    const updateVisitCount = async (contentId) => {
      try {
        await fetch(`/api/content/${contentId}/visit`, { method: 'POST' });
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMostVisitedContent = async () => {
      try {
        const response = await fetch('/api/most-visited');
        const data = await response.json();
        setMostVisitedContent(data);
      } catch (error) {
        console.error(error);
      }
    };

    const simulateContentVisit = async () => {
      const contentId = 1;
      await updateVisitCount(contentId);
      fetchMostVisitedContent();
    };

    simulateContentVisit();
  }, []);

  return (
    <div>
      <h2>Contenuti più visitati</h2>
      <ul>
        {mostVisitedContent.map((content) => (
          <li key={content.id_product}>
            {content.name} - Visite: {content.visit_count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MostVisitedContent;
