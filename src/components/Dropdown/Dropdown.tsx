import React from 'react';
import Select, {
  DropdownIndicatorProps,
  components,
  OptionProps,
  ControlProps,
  Props as SelectProps,
} from 'react-select';
import { isBlackTheme } from '../../Helper/Constant';
import styled from 'styled-components';
import { DropdownIcon } from '../../Svgs/Svg';
import ThemeContext from '../../store/ThemeContext';
import { getStyle, Menu, MenuList } from './utils';

export interface DropdownInterface {
  controlBg: string;
  menuBg: string;
  // labelColor: string;
}

const Dropdown: React.FC<SelectProps & { customStyle: DropdownInterface }> = ({
  defaultValue,
  className = '',
  options,
  customStyle,
  onChange,
  ...props
}) => {
  const { theme } = React.useContext(ThemeContext);

  // Combine default dropdown class with custom className
  const combinedClassName = `dropdown ${className}`.trim();

  return (
    <StyleSelect
      className={combinedClassName}
      isblacktheme={isBlackTheme(theme)}
      isSearchable={false}
      defaultValue={defaultValue}
      onChange={onChange}
      components={{ DropdownIndicator, Option, Control, Menu, MenuList }}
      options={options}
      styles={getStyle(theme, customStyle)}
      {...props}
    />
  );
};

const StyleSelect = styled(Select)<{ isblacktheme: string }>`
  .dropdown-svg {
  }
  .dropdown-control {
    ${(props) => (+props.isblacktheme ? '#1c2128' : 'inherit')}
  }
  .dropdown_option-is-focused {
    background-color: lightblue;
  }
  .dropdown-menu-list {
  }
`;
export default Dropdown;

const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => {
  const { theme } = React.useContext(ThemeContext);
  const { className } = props;
  const blackBg = isBlackTheme(theme);
  const combinedIndicatorClassName = `dropdown-svg ${className || ''}`.trim();
  
  return (
    <components.DropdownIndicator className={combinedIndicatorClassName} {...props}>
      <DropdownIcon pathFill={+blackBg ? '#adbac7' : '#1c2128'} />
    </components.DropdownIndicator>
  );
};

const Option: React.FC<OptionProps> = (props) => {
  const { cx, isDisabled, isFocused, isSelected, className } = props;
  return (
    <components.Option
      className={cx(
        {
          option: true,
          'option--is-disabled': isDisabled,
          'option--is-focused': isFocused,
          'option--is-selected': isSelected,
        },
        'dropdown',
        className
      )}
      {...props}
    ></components.Option>
  );
};

const Control: React.FC<ControlProps> = (props) => {
  const { className } = props;
  const combinedControlClassName = `dropdown-control ${className || ''}`.trim();
  return <components.Control className={combinedControlClassName} {...props} />;
};
