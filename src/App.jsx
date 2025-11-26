import React from 'react';
import Layout from './components/Layout';
import SplitScreen from './components/SplitScreen';
import SectionList from './components/SectionList';
import Preview from './components/Preview';
import { useReadmeState } from './hooks/useReadmeState';

function App() {
  const {
    sections,
    addSection,
    removeSection,
    updateSection,
    toggleSection,
    reorderSections,
  } = useReadmeState();

  return (
    <Layout sections={sections}>
      <SplitScreen
        leftPanel={
          <SectionList
            sections={sections}
            onAdd={addSection}
            onRemove={removeSection}
            onToggle={toggleSection}
            onReorder={reorderSections}
            onUpdate={updateSection}
          />
        }
        rightPanel={
          <Preview sections={sections} />
        }
      />
    </Layout>
  );
}

export default App;
