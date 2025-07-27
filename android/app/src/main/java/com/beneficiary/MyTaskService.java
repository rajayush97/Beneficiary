package com.sbw;

import android.content.Intent;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

public class MyTaskService extends HeadlessJsTaskService {
    @Override
    protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        return new HeadlessJsTaskConfig(
            "BackgroundAuthTask",
            Arguments.createMap(),
            5000, // Timeout in milliseconds
            false // Set to true if you want this task to run even when the app is in the foreground
        );
    }
}
