import React from 'react';

import { Extension } from './styled/Extension';
import { Icon } from './styled/Icon';
import { TitleContainer } from './styled/TitleContainer';
import { TitleText } from './styled/TitleText';

const Title = () => (
	<TitleContainer>
		<Icon />
		<TitleText>
			untitled<Extension>.people</Extension>
		</TitleText>
	</TitleContainer>
);

export { Title };
