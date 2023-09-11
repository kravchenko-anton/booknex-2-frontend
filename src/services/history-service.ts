import { getHistoryUrl } from '@/services/api.config'
import { request } from '@/services/api/request.api'
import {
	addHistoryDto,
	HistoryByBookIdType,
	HistoryGetType
} from '@/services/types/history-service-types'

export const historyService = {
	async getHistory() {
		return request<HistoryGetType[]>({
			url: getHistoryUrl('/'),
			method: 'GET'
		})
	},

	async byBookId(id: number) {
		return request<HistoryByBookIdType[]>({})
	},

	async addHistory(dto: addHistoryDto[]) {
		return request({
			url: getHistoryUrl('/add'),
			method: 'POST',
			data: dto
		})
	}
}
