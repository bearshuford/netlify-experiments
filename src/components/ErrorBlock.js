import React from 'react';

const ErrorBlock = ({ error }) => <>
  <h4>error:</h4>
  <pre>{!!error && error.toString()}</pre>
</>;

export default ErrorBlock;