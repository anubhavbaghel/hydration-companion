# Optimization Plan

## Notification Rescheduling
- Currently, when the day rolls over in `HydrationContext.tsx`, `waterDrank` is reset and reminders are updated, but the actual native notifications are NOT rescheduled. This means the user won't get alerts for the new day until they open the app and trigger something else.
- **Fix**: Call `scheduleHydrationReminders` inside the rollover block in `HydrationContext.tsx`.

## Notification Type Fixes
- The `android` object inside `NotificationContentInput` is not standard for `expo-notifications`.
- **Fix**: Move `channelId` and `priority` to the top level of the `content` object in `scheduleHydrationReminders.ts`.

## Haptics Optimization
- Switch from `performAndroidHapticsAsync` to `impactAsync` or `notificationAsync` for better cross-platform support.

## Dependency Check
- Ensure `scheduleHydrationReminders` is imported correctly in `HydrationContext.tsx`.
