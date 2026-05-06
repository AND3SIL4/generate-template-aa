import Logo from '@images/logo-byaas.png';
import ThemeSwticher from '../common/themeSwitcher';
import { getTheme } from '@/utils/themes';
import { useState } from 'react';
import { ThemeVariant } from '@/utils/types';
import DocsIcon from '@icons/docsIcons';
import ConfigIcon from '@icons/configIcon';
import { Button } from '@images/components/ui/button';
import { ColorPaletteIcon } from '@icons/colorPaletteIcon';
import { DropdownMenu } from '@images/components/ui/dropdown-menu';

const Navbar = () => {
  const [theme, setTheme] = useState<ThemeVariant>('gold');
  const t = getTheme(theme);

  return (
    <nav className={`flex items-center justify-between p-3 ${t.bgGlow1}`}>
      {/* Left side of the navbar */}
      <div className="flex items-center gap-4">
        <img src={Logo} alt="Logo project Byaas" className="w-20 h-20" />
        <div>
          <h1 className="text-lg font-bold">AA Template Genertor</h1>
          <p>Create the best practice Automation Anywhere templates</p>
        </div>
      </div>
      {/* Navbar rigth side */}
      <div className="flex justify-between items-center gap-2">
        <ThemeSwticher/>
        <Button variant={"outline"} className="cursor-pointer">
          <DocsIcon/> Documentation
        </Button>
        <Button variant={"outline"} className="cursor-pointer">
          <ConfigIcon/>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
