#!/bin/bash
export GRADLE_USER_HOME=/mnt/storage/gradle-cache
export ANDROID_HOME=/mnt/storage/android-sdk
export ANDROID_SDK_ROOT=/mnt/storage/android-sdk
export ANDROID_NDK_HOME=/mnt/storage/android-sdk/ndk/27.1.12297006
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$ANDROID_HOME/cmdline-tools/latest/bin

cd /mnt/storage/dev/hydration-companion/android
echo "Stopping gradle daemon..."
./gradlew --stop
echo "Running assembleRelease..."
./gradlew assembleRelease --stacktrace --info
echo "DONE!"
