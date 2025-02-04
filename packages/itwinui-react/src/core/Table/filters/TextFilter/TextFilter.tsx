/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useGlobals } from '../../../utils/index.js';
import { Input } from '../../../Input/index.js';
import { FilterButtonBar } from '../FilterButtonBar.js';
import type { FilterButtonBarTranslation } from '../FilterButtonBar.js';
import { BaseFilter } from '../BaseFilter.js';
import type { TableFilterProps } from '../types.js';

export type TextFilterProps<T extends Record<string, unknown>> =
  TableFilterProps<T> & {
    translatedLabels?: FilterButtonBarTranslation;
  };

export const TextFilter = <T extends Record<string, unknown>>(
  props: TextFilterProps<T>,
) => {
  const { column, translatedLabels, setFilter, clearFilter } = props;

  useGlobals();

  const [text, setText] = React.useState(column.filterValue ?? '');

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey) {
      return;
    }

    if (event.key === 'Enter') {
      setFilter(text);
    }
  };

  return (
    <BaseFilter>
      <Input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <FilterButtonBar
        setFilter={() => setFilter(text)}
        clearFilter={clearFilter}
        translatedLabels={translatedLabels}
      />
    </BaseFilter>
  );
};
