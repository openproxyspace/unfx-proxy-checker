import React from 'react';
import ResultBlacklistItem from './ResultBlacklistItem';

const ResultBlacklist = ({ inBlacklists, toggle }) => inBlacklists.map(item => <ResultBlacklistItem {...item} key={item.title} toggle={toggle} />);

export default ResultBlacklist;
