import api from 'services/api'

import { RootState } from 'store'

import { UniversitiesResType } from 'types/Responses/university/universities'
import { SeasonsResType, SeasonsType } from 'types/Responses/university/seasons'
import { AdministratorResType } from 'types/Responses/user/rolesData'
import { RolesType } from 'types/Responses/user/roles'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type Universities = {
  id: number
  name: string
  isAdmin: boolean
  seasons?: SeasonsType
}[]

interface GetUserUniversitiesParams {
  userId: number
  updated?: boolean
  userRoles: RolesType
}

export interface UserUniversitiesState {
  loading: boolean
  universities?: Universities
}

const initialState: UserUniversitiesState = { loading: true }

export const getUserUniversities = createAsyncThunk(
  'userUniversities/getUserUniversities',
  async (
    { userId, userRoles, updated }: GetUserUniversitiesParams,
    { getState }
  ) => {
    const {
      userUniversities: { universities: userUniversities }
    } = getState() as RootState

    const newUserUniversities: Universities = []
    const hasAdminRole = userRoles.find(role => role === 'administrator')

    if (updated || userUniversities) {
      let adminUniversityId
      const { universities: rolesUniversities }: UniversitiesResType =
        await api.get(`api/users/${userId}/roles/universities`)

      if (hasAdminRole) {
        const { administrator }: AdministratorResType = await api.get(
          `api/users/${userId}/roles/administrator`
        )

        adminUniversityId = administrator.university.id
      }

      for (let i = 0; i < rolesUniversities?.length; i++) {
        const { id, name } = rolesUniversities[i]

        const { seasons }: SeasonsResType = await api.get(
          `api/universities/${id}/seasons`
        )

        console.log('real', seasons)

        newUserUniversities.push({
          name,
          seasons,
          id: rolesUniversities[i].id,
          isAdmin: adminUniversityId === id
        })
      }
    }

    return { universities: newUserUniversities }
  }
)

const UserUniversities = createSlice({
  initialState,
  reducers: { reset: () => initialState },
  name: 'userUniversities',
  extraReducers: ({ addCase }) => {
    addCase(getUserUniversities.pending, state => ({ ...state, loading: true }))

    addCase(getUserUniversities.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      loading: false
    }))
  }
})

export const UserUniversitiesActions = UserUniversities.actions

export default UserUniversities
