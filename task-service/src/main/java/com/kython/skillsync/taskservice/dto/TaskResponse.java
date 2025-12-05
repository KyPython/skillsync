package com.kython.skillsync.taskservice.dto;

import com.kython.skillsync.taskservice.model.TaskPriority;
import com.kython.skillsync.taskservice.model.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskResponse {
    
    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private LocalDateTime dueDate;
    private TaskPriority priority;
    private Long assigneeId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

