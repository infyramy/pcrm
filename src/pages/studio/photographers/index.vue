<template>
  <div class="space-y-6">
    <!-- Loading Page Overlay -->
    <LoadingPage
      v-if="isLoadingWorkspace"
      title="Setting up your photographer workspace"
      description="We're preparing your photographer management workspace with all the tools you need. This will just take a moment."
    />

    <PageHeader :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Photographers</h1>
        <p class="text-sm text-gray-600 mt-1">
          Manage your studio photographers, videographers, and creative team
        </p>
      </div>
      <Button @click="createNewPhotographer" class="flex items-center gap-2">
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add New Photographer
      </Button>
    </div>

    <!-- DataTable Implementation -->
    <DataTable
      :data="photographers"
      :columns="tableColumns"
      :show-numbering="true"
      :page-size="10"
      :page-size-options="[5, 10, 25, 50]"
      row-key="id"
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
      @update:sort="handleSort"
      @update:filters="handleFilters"
      :loading="isLoading"
    >
      <!-- Custom template for photo/name column -->
      <template #cell-name="{ item }">
        <div class="flex items-center gap-3">
          <Avatar class="h-10 w-10">
            <AvatarImage :src="item.profileImage" :alt="item.name" />
            <AvatarFallback>{{ getInitials(item.name || "") }}</AvatarFallback>
          </Avatar>
          <div>
            <div class="font-semibold text-gray-900">{{ item.name }}</div>
            <div class="text-sm text-gray-500">{{ item.email }}</div>
          </div>
        </div>
      </template>

      <!-- Custom template for role column -->
      <template #cell-role="{ item }">
        <div class="text-sm">
          {{ item.roles.join(", ") }}
        </div>
      </template>

      <!-- Custom template for status column -->
      <template #cell-status="{ item }">
        <Badge :variant="getStatusVariant(item.status)" class="capitalize">
          {{ item.status }}
        </Badge>
      </template>

      <!-- Custom template for availability column -->
      <template #cell-availability="{ item }">
        <Badge
          :variant="getAvailabilityVariant(item.availability)"
          class="capitalize"
        >
          {{ item.availability }}
        </Badge>
      </template>

      <!-- Custom template for rating column -->
      <template #cell-rating="{ item }">
        <div class="flex items-center gap-1 justify-center">
          <span class="text-sm font-medium">{{ item.rating || 0 }}</span>
          <svg
            class="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        </div>
      </template>

      <!-- Custom template for actions column -->
      <template #cell-actions="{ item }">
        <div class="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" size="sm" class="h-8 w-8 p-0">
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="viewPhotographer(item.id)">
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem @click="editPhotographer(item.id)">
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem @click="assignJob(item.id)">
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Assign Job
              </DropdownMenuItem>
              <DropdownMenuItem @click="viewSchedule(item.id)">
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                View Schedule
              </DropdownMenuItem>
              <DropdownMenuItem @click="manageAccess(item.id)">
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
                Manage Access
              </DropdownMenuItem>
              <DropdownMenuItem @click="viewPayments(item.id)">
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
                Payment History
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                @click="toggleStatus(item.id)"
                :class="
                  item.status === 'active'
                    ? 'text-orange-600'
                    : 'text-green-600'
                "
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="
                      item.status === 'active'
                        ? 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636'
                        : 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    "
                  />
                </svg>
                {{ item.status === "active" ? "Deactivate" : "Activate" }}
              </DropdownMenuItem>
              <DropdownMenuItem
                @click="deletePhotographer(item.id)"
                class="text-red-600"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </template>

      <!-- Custom empty state -->
      <template #empty-state>
        <div class="text-center py-8">
          <svg
            class="w-12 h-12 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            No photographers yet
          </h3>
          <p class="text-gray-500 mb-4">
            Start building your creative team by adding photographers and
            videographers
          </p>
          <Button @click="createNewPhotographer">
            Add Your First Photographer
          </Button>
        </div>
      </template>
    </DataTable>

    <!-- Photographer Detail Dialog -->
    <Dialog v-model:open="isDetailDialogOpen">
      <DialogContent class="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle class="flex items-center gap-3">
            <Avatar class="h-12 w-12">
              <AvatarImage
                :src="selectedPhotographer?.profileImage"
                :alt="selectedPhotographer?.name"
              />
              <AvatarFallback>{{
                getInitials(selectedPhotographer?.name || "")
              }}</AvatarFallback>
            </Avatar>
            <div>
              <div class="text-xl font-semibold">
                {{ selectedPhotographer?.name }}
              </div>
              <div class="text-sm text-gray-500">
                {{ selectedPhotographer?.email }}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div v-if="selectedPhotographer" class="space-y-6">
          <!-- Basic Info -->
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-600">Phone</label>
                <p class="text-sm">
                  {{ selectedPhotographer.phone || "Not provided" }}
                </p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600"
                  >Emergency Contact</label
                >
                <p class="text-sm">
                  {{ selectedPhotographer.emergencyContact || "Not provided" }}
                </p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600"
                  >Date Joined</label
                >
                <p class="text-sm">
                  {{ formatDate(selectedPhotographer.dateJoined) }}
                </p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600"
                  >IC/Passport</label
                >
                <p class="text-sm">
                  {{
                    selectedPhotographer.identificationNumber || "Not provided"
                  }}
                </p>
              </div>
            </CardContent>
          </Card>

          <!-- Roles and Skills -->
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Roles & Skills
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div>
                <label class="text-sm font-medium text-gray-600 block mb-2"
                  >Roles</label
                >
                <div class="flex flex-wrap gap-2">
                  <Badge
                    v-for="role in selectedPhotographer.roles"
                    :key="role"
                    variant="secondary"
                  >
                    {{ role }}
                  </Badge>
                </div>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600 block mb-2"
                  >Skills</label
                >
                <div class="flex flex-wrap gap-2">
                  <Badge
                    v-for="skill in selectedPhotographer.skills"
                    :key="skill"
                    variant="outline"
                  >
                    {{ skill }}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Job Statistics -->
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Job Statistics
              </CardTitle>
            </CardHeader>
            <CardContent class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">
                  {{ selectedPhotographer.totalJobs || 0 }}
                </div>
                <div class="text-sm text-gray-600">Total Jobs</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-green-600">
                  {{ selectedPhotographer.completedJobs || 0 }}
                </div>
                <div class="text-sm text-gray-600">Completed</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-yellow-600">
                  {{ selectedPhotographer.upcomingJobs || 0 }}
                </div>
                <div class="text-sm text-gray-600">Upcoming</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-red-600">
                  {{ selectedPhotographer.cancelledJobs || 0 }}
                </div>
                <div class="text-sm text-gray-600">Cancelled</div>
              </div>
            </CardContent>
          </Card>

          <!-- Rating and Feedback -->
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                Rating & Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex items-center gap-4 mb-4">
                <div class="flex items-center gap-2">
                  <div class="flex">
                    <svg
                      v-for="n in 5"
                      :key="n"
                      class="w-6 h-6"
                      :class="
                        n <= (selectedPhotographer.rating || 0)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>
                  <span class="text-lg font-semibold"
                    >{{ selectedPhotographer.rating || 0 }}/5</span
                  >
                  <span class="text-gray-600"
                    >({{ selectedPhotographer.reviewCount || 0 }} reviews)</span
                  >
                </div>
              </div>
              <div class="space-y-3">
                <div
                  v-for="review in selectedPhotographer.recentReviews"
                  :key="review.id"
                  class="border-l-4 border-blue-500 pl-4"
                >
                  <div class="flex items-center gap-2 mb-1">
                    <div class="flex">
                      <svg
                        v-for="n in 5"
                        :key="n"
                        class="w-4 h-4"
                        :class="
                          n <= review.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    </div>
                    <span class="text-sm font-medium">{{
                      review.clientName
                    }}</span>
                    <span class="text-xs text-gray-500">{{
                      formatDate(review.date)
                    }}</span>
                  </div>
                  <p class="text-sm text-gray-700">{{ review.comment }}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Portfolio Gallery -->
          <Card
            v-if="
              selectedPhotographer.portfolio &&
              selectedPhotographer.portfolio.length > 0
            "
          >
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Portfolio Gallery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div class="grid grid-cols-3 md:grid-cols-4 gap-4">
                <div
                  v-for="image in selectedPhotographer.portfolio"
                  :key="image.id"
                  class="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  @click="openImageModal(image)"
                >
                  <img
                    :src="image.thumbnail"
                    :alt="image.title"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Notes -->
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Private Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                v-model="selectedPhotographer.notes"
                placeholder="Add private notes about this photographer..."
                class="min-h-[100px]"
                @blur="saveNotes"
              />
            </CardContent>
          </Card>
        </div>

        <DialogFooter class="flex justify-between">
          <div class="flex gap-2">
            <Button
              variant="outline"
              @click="editPhotographer(selectedPhotographer?.id)"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Profile
            </Button>
            <Button
              variant="outline"
              @click="downloadProfilePDF(selectedPhotographer?.id)"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download PDF
            </Button>
          </div>
          <Button @click="isDetailDialogOpen = false">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import DataTable from "@/components/ui/data-table/DataTable.vue";
import PageHeader from "@/layouts/components/PageHeader.vue";
import LoadingPage from "@/components/ui/loading/LoadingPage.vue";
import type { Photographer, BadgeVariant } from "@/types/photographer";

// Page state
const isLoadingWorkspace = ref(false);
const isLoading = ref(false);
const isDetailDialogOpen = ref(false);
const selectedPhotographer = ref<Photographer | null>(null);
const router = useRouter();

// Breadcrumb configuration
const breadcrumbs = ref([
  {
    label: "Photographers",
    href: "/studio/photographers",
    count: 1,
    action: false,
  },
]);

// Table configuration
const tableColumns = ref([
  {
    key: "name",
    title: "Photographer",
    sortable: true,
    filterable: true,
    width: "300px",
  },
  {
    key: "role",
    title: "Role",
    sortable: true,
    filterable: true,
    width: "200px",
  },
  {
    key: "status",
    title: "Status",
    sortable: true,
    filterable: true,
    width: "120px",
  },
  {
    key: "availability",
    title: "Availability",
    sortable: true,
    filterable: true,
    width: "120px",
  },
  {
    key: "rating",
    title: "Rating",
    sortable: true,
    filterable: false,
    width: "100px",
  },
  {
    key: "actions",
    title: "Actions",
    sortable: false,
    filterable: false,
    width: "80px",
  },
]);

// Sample data - this would normally come from API
const photographers = ref<Photographer[]>([
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@studio.com",
    phone: "+60123456789",
    profileImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b577?w=150",
    roles: ["Photographer", "Editor"],
    status: "active",
    availability: "free",
    totalJobs: 45,
    completedJobs: 42,
    upcomingJobs: 3,
    cancelledJobs: 2,
    rating: 4.8,
    reviewCount: 38,
    dateJoined: new Date("2023-01-15"),
    emergencyContact: "John Chen (+60198765432)",
    identificationNumber: "A12345678",
    skills: ["Wedding", "Portrait", "Lightroom", "Photoshop"],
    portfolio: [
      {
        id: "1",
        title: "Wedding Shot",
        thumbnail:
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=200",
      },
      {
        id: "2",
        title: "Portrait",
        thumbnail:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
      },
    ],
    recentReviews: [
      {
        id: "1",
        clientName: "Alice Wong",
        rating: 5,
        comment: "Amazing work! Very professional and creative.",
        date: new Date("2024-01-10"),
      },
    ],
    notes:
      "Excellent photographer, specializes in natural light photography. Prefers early morning shoots.",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus.johnson@studio.com",
    phone: "+60123456790",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    roles: ["Videographer", "Editor"],
    status: "active",
    availability: "busy",
    totalJobs: 32,
    completedJobs: 30,
    upcomingJobs: 2,
    cancelledJobs: 1,
    rating: 4.6,
    reviewCount: 28,
    dateJoined: new Date("2023-03-20"),
    emergencyContact: "Mary Johnson (+60198765433)",
    identificationNumber: "B98765432",
    skills: ["Cinematic", "Drone", "Premiere Pro", "After Effects"],
    portfolio: [],
    recentReviews: [],
    notes:
      "Specializes in cinematic videography. Expert with drone photography.",
  },
  {
    id: "3",
    name: "Priya Sharma",
    email: "priya.sharma@studio.com",
    phone: "+60123456791",
    profileImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    roles: ["Photographer"],
    status: "inactive",
    availability: "on-leave",
    totalJobs: 18,
    completedJobs: 15,
    upcomingJobs: 0,
    cancelledJobs: 3,
    rating: 4.2,
    reviewCount: 12,
    dateJoined: new Date("2023-08-10"),
    emergencyContact: "Raj Sharma (+60198765434)",
    identificationNumber: "C11111111",
    skills: ["Event", "Corporate", "Lightroom"],
    portfolio: [],
    recentReviews: [],
    notes: "Currently on maternity leave. Excellent for corporate events.",
  },
]);

// Initialize data on component mount
onMounted(async () => {
  await fetchPhotographers();
});

// Fetch photographers from API (currently using mock data)
const fetchPhotographers = async () => {
  isLoading.value = true;
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, you would fetch from API here
    // const response = await photographerService.getPhotographers(currentPage.value, pageSize.value);
    // photographers.value = response.photographers;
    
    // For now, using mock data (no changes needed)
  } catch (error) {
    console.error("Error fetching photographers:", error);
  } finally {
    isLoading.value = false;
  }
};

// Utility functions
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getStatusVariant(status: string): BadgeVariant {
  switch (status) {
    case "active":
      return "default";
    case "inactive":
      return "secondary";
    default:
      return "outline";
  }
}

function getAvailabilityVariant(availability: string): BadgeVariant {
  switch (availability) {
    case "free":
      return "default";
    case "busy":
      return "destructive";
    case "on-leave":
      return "secondary";
    default:
      return "outline";
  }
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

// Event handlers
function handlePageChange(page: number) {
  fetchPhotographers();
}

function handlePageSizeChange(pageSize: number) {
  fetchPhotographers();
}

function handleSort(column: string | null, direction: "asc" | "desc" | null) {
  console.log("Sort changed:", { column, direction });
  fetchPhotographers();
}

function handleFilters(filters: Record<string, any>) {
  console.log("Filters changed:", filters);
  fetchPhotographers();
}

function createNewPhotographer() {
  router.push("/studio/photographers/new");
}

function viewPhotographer(id: string) {
  selectedPhotographer.value =
    photographers.value.find((p) => p.id === id) || null;
  isDetailDialogOpen.value = true;
}

function editPhotographer(id?: string) {
  if (!id) return;
  router.push(`/studio/photographers/${id}/edit`);
}

function assignJob(id: string) {
  router.push(`/studio/photographers/${id}/assign-job`);
}

function viewSchedule(id: string) {
  router.push(`/studio/photographers/${id}/schedule`);
}

function manageAccess(id: string) {
  router.push(`/studio/photographers/${id}/access`);
}

function viewPayments(id: string) {
  router.push(`/studio/photographers/${id}/payments`);
}

function toggleStatus(id: string) {
  const photographer = photographers.value.find((p) => p.id === id);
  if (photographer) {
    photographer.status =
      photographer.status === "active" ? "inactive" : "active";
  }
}

function deletePhotographer(id: string) {
  const index = photographers.value.findIndex((p) => p.id === id);
  if (index > -1) {
    photographers.value.splice(index, 1);
  }
}

function saveNotes() {
  // Save notes to backend
  console.log("Saving notes for photographer:", selectedPhotographer.value?.id);
}

function downloadProfilePDF(id?: string) {
  if (!id) return;
  console.log("Downloading profile PDF for photographer:", id);
}

function openImageModal(image: any) {
  console.log("Opening image modal:", image);
}
</script>
