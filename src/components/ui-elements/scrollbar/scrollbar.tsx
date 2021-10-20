import { Scrollbars, ScrollbarProps } from 'react-custom-scrollbars';

/**
 * This function create the rounded scrollbar.
 * 
 * @param param0 is the properties of the scrollbar 
 * @returns 
 */
const renderThumb = ({ style, ...props }: {style: React.CSSProperties | undefined}) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: '#606062BB'
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

/**
 * This function creates a custom scrollbar. (Rounded)
 * 
 * @param props is the properties of the scrollbar
 * @returns 
 */
const CustomScrollbars = (props: ScrollbarProps) => (
  <Scrollbars
    renderThumbHorizontal={renderThumb}
    renderThumbVertical={renderThumb}
    {...props}
  />
);

export default CustomScrollbars;