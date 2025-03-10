import {
	Flame,
	MapPin
} from 'lucide-react';

import { RocketInfoProps, DashboardProps, CardProps, StatusCardProps } from '@/components/types';

import { iconMappings } from '@/components/constants/iconMappings';
import { unitMappings } from '@/components/constants/unitMappings';
import { titleMappings, camelCaseToTitleCase } from '@/components/constants/titleMappings';

import { statusMappings } from '@/components/utils/statusMappings';
import { getStatusColor } from '@/components/utils/getStatusColor';
import { customIconTextColors, customIconBgColors } from '@/components/constants/customIcon';

import { useRocketData } from '@/components/hooks/useRocketData';
import { useLaunchInfo } from '@/components/hooks/useLaunchInfo';

import { useNavigate } from 'react-router-dom';
import React from 'react';



// Componente Card base
const Card: React.FC<CardProps> = ({ children, className = '' }) => (
	<div className={`bg-zinc-900 rounded-lg p-4 ${className}`}>
		{children}
	</div>
);

// Componente de Informação do Foguete
const RocketInfo: React.FC<RocketInfoProps> = ({ rocket, launch }) => (
	<Card className="relative row-span-2">
		<div className="h-32 overflow-hidden rounded-lg mb-4">
			<img
				src="/rockets/spacex--p-KCm6xB9I-unsplash.jpg"
				alt="Falcon Heavy"
				className="w-full h-full object-cover"
			/>
		</div>
		{rocket ? (
			<>
				<h2 className="text-xl font-bold text-white mb-2">{rocket.name}</h2>
				<div className="space-y-1 text-gray-400">
					<p>Comprimento: {rocket.height} m</p>
					<p>Diâmetro: {rocket.diameter} m</p>
					<p>Massa: {rocket.weight} kg</p>
				</div></>
		) : (
			<h1 className="text-zinc-500 text-sm">
				Carregando informações do foguete...
			</h1>
		)}


		<div className="flex justify-between mt-3 items-center">
			<div className='flex'>
				<MapPin className="w-5 h-5 text-gray-400" />
				<span>Aveiro, Portugal</span>
			</div>
			{launch ? (
				<span className={`px-2 py-1 bg-green-500/20 text-white-500 rounded text-sm ${getStatusColor(
					launch.status
				)}`}>
					{launch?.status.toLowerCase()}
				</span>) : <span className="px-2 py-1 bg-green-500/20 text-white-500 rounded text-sm ">
				Sem status
			</span>}
		</div>
	</Card>
);


// Componente Status Card
const StatusCard: React.FC<StatusCardProps> = ({
	icon: Icon,
	iconTextColor = 'text-gray-400',
	iconBgColor = 'bg-gray-800',
	title,
	value,
	unit,
	status,
	className = "",
}) => (
	<Card className={className}>
		<div className="flex items-center gap-3 mb-4">
			<div className={`p-2 rounded-lg ${iconBgColor}`}>
				<Icon className={`w-6 h-6 ${iconTextColor}`} />
			</div>
			<span className="text-gray-400">{title}</span>
		</div>
		<div className="flex items-baseline gap-2">
			<span className="text-4xl font-bold text-white">{Number(value).toFixed(2)}</span>
			<span className="text-gray-400">{unit}</span>
		</div>

		{status && status === 'Normal' ? (
			<span className="inline-block mt-2 px-2 py-1 bg-green-500/20 text-green-500 rounded text-sm">
				{status}
			</span>
		) : (
			<span className="inline-block mt-2 px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded text-sm">
				{status}
			</span>
		)}
	</Card>
);


const LoadingState: React.FC = () => (
	<div className="flex justify-center items-center h-full">
		<span className="text-gray-500">Carregando dados...</span>
	</div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
	<div className="flex justify-center items-center h-full  p-4">
		<span className="text-red-500">{message}</span>
	</div>
);

const Dashboard: React.FC<DashboardProps> = ({ launchId }) => {
	const navigate = useNavigate();

	if (!launchId) {
		navigate('/dashboard')
		return null
	}
	// unsado os conceitos de hooks customizados que viram nas aulas teoricas
	const { rocketData,
		// isConnected, 
		error: rocketDataError } = useRocketData(launchId);
	const {
		launch,
		rocket,
		isLoading,
		error: launchInfoError
	} = useLaunchInfo(launchId);

	if (isLoading) return <LoadingState />;

	if (launchInfoError || rocketDataError) {
		return (
			<ErrorState
				message={launchInfoError || rocketDataError || 'Erro desconhecido'}
			/>
		);
	}


	if (!rocketData) {
		return (
			<div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
				{rocket ? (
					<RocketInfo rocket={rocket} launch={launch} />
				) : (
					<h1 className="text-zinc-500 text-sm">
						Nenhum lançamento cadastrado para essa data.
					</h1>
				)}
			</div>
		);
	}
	return (
		<div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{rocket && <RocketInfo rocket={rocket} launch={launch} />}

				{Object.entries(rocketData)
					.filter(([key]) => !['alertas', 'alerta'].includes(key))
					.map(([key, value]) => {
						const title = titleMappings[key] || camelCaseToTitleCase(key);
						const unit = unitMappings[key] || '';
						const status = statusMappings(key, value as number);
						const Icon = iconMappings[key] || Flame;
						const iconTextColor = customIconTextColors[key] || 'text-red-500';
						const iconBgColor = customIconBgColors[key] || 'bg-red-500/20';

						return (
							<StatusCard
								key={key}
								icon={Icon}
								title={title}
								value={value as number}
								unit={unit}
								status={status}
								iconTextColor={iconTextColor}
								iconBgColor={iconBgColor}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default Dashboard;
