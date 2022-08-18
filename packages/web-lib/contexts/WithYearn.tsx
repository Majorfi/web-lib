import	React, {ReactElement}					from	'react';
import	{Web3ReactProvider, Web3ReactHooks}		from	'@web3-react/core';
import	type {Connector}						from	'@web3-react/types';
import	{UIContextApp}							from	'./useUI';
import	{Web3ContextApp}						from	'./useWeb3';
import	{SettingsContextApp}					from	'./useSettings';
import	{connectors}							from	'../utils/connectors';
import	type {TUIOptions}						from	'./useUI.d';
import	type {TWeb3Options}						from	'./useWeb3.d';
import	type {TSettingsBase, TSettingsOptions}	from	'./useSettings.d';

function	WithYearn({children, options}: {
	children: ReactElement
	options?: {
		ui?: TUIOptions,
		web3?: TWeb3Options,
		networks?: TSettingsOptions,
		baseSettings?: TSettingsBase,
	}
}): ReactElement {
	const web3Connectors: [Connector | any, Web3ReactHooks][] = [
		[connectors.metamask.connector, connectors.metamask.hooks],
		[connectors.walletConnect.connector, connectors.walletConnect.hooks],
		[connectors.eip1193.connector, connectors.eip1193.hooks],
		[connectors.gnosisSafe.connector, connectors.gnosisSafe.hooks],
		[connectors.coinbase.connector, connectors.coinbase.hooks]
	];

	return (
		<UIContextApp options={options?.ui}>
			<SettingsContextApp
				networksOptions={options?.networks}
				baseOptions={options?.baseSettings}>
				<Web3ReactProvider connectors={web3Connectors} lookupENS={false}>
					<Web3ContextApp options={options?.web3}>
						{children}
					</Web3ContextApp>
				</Web3ReactProvider>
			</SettingsContextApp>
		</UIContextApp>
	);
}

export {WithYearn};
