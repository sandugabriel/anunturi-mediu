import React, { FC } from 'react'
import zip from '../utils/zip'
import List from './PhotoList'
import SinglePrize from './SinglePrize'

type Prize = {
	photo: string,
	name: string,
	number: number,
	alreadyDone: number,
	highlighted: boolean
}

type Props = {
	prizes: Prize[]
}

const PrizeComponent:FC<Props> = ({prizes}) => {
	console.log(prizes)
  return (
		
    <List 
			data={prizes}
			keyExtractor={(item) => item['name']}
			renderItem={(item) => (
				<SinglePrize image={item.photo} name={item.name} number={item.number} alreadyDone={item.alreadyDone} highlighted={item.highlighted} />
	)}
			className="flex flex-row w-full justify-evenly px-10 py-5"
			/>
  )
}

export default PrizeComponent