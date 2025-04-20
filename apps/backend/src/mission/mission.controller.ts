import { Controller, Get } from '@nestjs/common'

@Controller('mission')
export class MissionController {
	@Get()
	getAll() {
		return [
			{ id: 1, title: 'first mission', done: false },
			{ id: 2, title: 'second mission', done: true },
		]
	}
}
