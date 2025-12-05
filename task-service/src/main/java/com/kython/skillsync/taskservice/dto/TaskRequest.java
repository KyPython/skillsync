package com.kython.skillsync.taskservice.dto;

import com.kython.skillsync.taskservice.model.TaskPriority;
import com.kython.skillsync.taskservice.model.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskRequest {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    @NotNull(message = "Status is required")
    private TaskStatus status;
    
    private LocalDateTime dueDate;
    
    @NotNull(message = "Priority is required")
    private TaskPriority priority;
    
    private Long assigneeId;
}

