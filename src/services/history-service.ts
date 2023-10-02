import { getHistoryUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import {
	AddHistoryDto,
	HistoryGetType
} from '@/services/types/history-service-types'

export const historyService = {
	async getHistory() {
		return request<HistoryGetType[]>({
			url: getHistoryUrl('/'),
			method: 'GET'
		})
	},

	async addHistory(dto: AddHistoryDto[]) {
		return request({
			url: getHistoryUrl('/add'),
			method: 'POST',
			data: dto
		})
	}
}
