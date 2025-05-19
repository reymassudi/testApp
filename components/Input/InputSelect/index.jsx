'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import ChevronDown from '@/public/icons/chevron-down.svg';
import Search from '@/public/icons/search.svg';
import './input-select.scss';

const InputSelect = ({
  name,
  options,
  label,
  styles,
  contained,
  hasSearch,
  searchPlaceholder,
  onInputChange,
  defaultValue,
  showValueOnLabel,
  disabled,
}) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);

    if (hasSearch) {
      searchInputRef?.current.focus();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const v = options?.find((o) => o.value === defaultValue);
    setSelectedOption(v);
  }, [defaultValue]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onInputChange) {
      onInputChange(option.value, name);
    }
  };

  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      className={`custom-select ${styles ? styles : ''} ${hasSearch ? 'has-search' : ''}`}
      ref={dropdownRef}
    >
      <div className="select-input-wrapper" onClick={toggleDropdown}>
        <input
          readOnly
          type="hidden"
          name={name}
          value={selectedOption ? selectedOption.value : ''}
        />

        <div
          className={`select-input${contained ? ' input-contained' : ''}${disabled ? ' opacity-50' : ''}`}
        >
          {selectedOption ? (
            <span className="custom-input-value">
              {showValueOnLabel ? selectedOption.value : selectedOption.label}
            </span>
          ) : label ? (
            <span className="custom-input-placeholder">{label}</span>
          ) : (
            ''
          )}

          <span className={`select-arrow ${isOpen ? 'open' : ''}`}>
            <ChevronDown />
          </span>
        </div>
      </div>

      <div className={`select-dropdown${isOpen ? ' open' : ''}`}>
        {hasSearch && (
          <div className="select-search-input">
            <Search />

            <input
              ref={searchInputRef}
              className="body-3"
              type="text"
              placeholder={
                searchPlaceholder ? searchPlaceholder : t('general.search')
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        <ul>
          {filteredOptions?.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={`dropdown-option ${option.value === selectedOption?.value ? 'dropdown-option-selected' : ''}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InputSelect;
