import * as SeparatorPrimitive from '@rn-primitives/separator';
import * as React from 'react';

function Separator({
  orientation = 'horizontal',
  decorative = true,
  ...props
}: SeparatorPrimitive.RootProps & {
  ref?: React.RefObject<SeparatorPrimitive.RootRef>;
}) {
  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  );
}

export { Separator };
