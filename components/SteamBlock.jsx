'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function SpotifyBlock() {
	const [loadingData, setLoadingData] = useState(false)
	const [steamData, setSteamData] = useState({})

	const GetSteamData = async () => {
		const response = await fetch('/api/steam', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const steam = await response.json()
		setSteamData(steam)
		setLoadingData(true)
	}

	useEffect(() => {
		GetSteamData()
	}, [])
	return (
		<Link
			target={'_blank'}
			href="https://steamcommunity.com/id/BDonBarty"
			className="flex flex-col md:justify-end justify-center relative w-full h-full p-3 md:p-6 text-white"
		>
			<Image
				className="w-full h-full p-4 absolute object-contain top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 opacity-5 md:opacity-20"
				src={'/images/steamlogo.svg'}
				width={50}
				height={50}
				alt={''}
			/>
			{!loadingData ? (
				<p>loading..</p>
			) : (
				<div className="flex flex-col gap-2 items-center text-white">
					<Image
						className="rounded-xl w-20 h-20 group-hover:translate-y-0 translate-y-0 md:-translate-y-52 transition-all duration-300"
						src={steamData.getAvatar}
						width={80}
						height={80}
						alt={'steamAvatar'}
					/>
					<div className="flex flex-col text-center gap-2 group-hover:translate-y-0 translate-y-0 md:translate-y-20 transition-all duration-300">
						<div className="md:w-9/12">
							<p className="font-bold lowercase">{steamData.getPersonName}</p>
							<p className="lowercase">{steamData.getStatus}</p>
						</div>
					</div>
				</div>
			)}
		</Link>
	)
}
