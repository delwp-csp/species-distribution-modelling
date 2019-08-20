import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default function Textarea() {
  return <TextareaAutosize aria-label="minimum height" rows={5} placeholder="Enter specie description" />;
}