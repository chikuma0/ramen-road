export const ramenFamilyTree = {
  nodes: [
    { id: 'yoshimura', name: '吉村家' },
    { id: 'direct-lineage', name: '直系' },
    { id: 'classic', name: 'クラシック系' },
    { id: 'ichi', name: '壱系' },
    { id: 'shinnakano', name: '新中野武蔵家系' },
  ],
  links: [
    { source: 'yoshimura', target: 'direct-lineage' },
    { source: 'yoshimura', target: 'classic' },
    { source: 'yoshimura', target: 'ichi' },
    { source: 'yoshimura', target: 'shinnakano' },
  ],
};
