import React from 'react';

const CommentIcon = ({ fill = 'none', stroke = '#000', strokeWidth = 2 }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default CommentIcon;
