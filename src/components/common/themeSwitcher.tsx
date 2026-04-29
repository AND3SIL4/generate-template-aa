import { ColorPaletteIcon } from '@icons/colorPaletteIcon';
import Button from '../ui/button';

const ThemeSwticher = () => {
  return (
    <div className="flex justify-between">
      <Button size="md">
        <ColorPaletteIcon /> Theme
      </Button>
    </div>
  );
};

export default ThemeSwticher;
