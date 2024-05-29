import NextHead from 'next/head';

const CustomHead = ({ title }) => (
  <NextHead>
    <title>{title}</title>
    {/* Include any other head elements here */}
  </NextHead>
);

export default CustomHead;
