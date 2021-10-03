import { Scrollbars, ScrollbarProps } from 'react-custom-scrollbars';

const renderThumb = ({ style, ...props }: {style: React.CSSProperties | undefined}) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: '#606062BB'
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const CustomScrollbars = (props: ScrollbarProps) => (
  <Scrollbars
    renderThumbHorizontal={renderThumb}
    renderThumbVertical={renderThumb}
    {...props}
  />
);

export default CustomScrollbars;