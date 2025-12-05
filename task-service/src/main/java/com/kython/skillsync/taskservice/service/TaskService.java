package com.kython.skillsync.taskservice.service;

import com.kython.skillsync.taskservice.dto.TaskRequest;
import com.kython.skillsync.taskservice.dto.TaskResponse;
import com.kython.skillsync.taskservice.exception.TaskNotFoundException;
import com.kython.skillsync.taskservice.model.Task;
import com.kython.skillsync.taskservice.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskService {
    
    private final TaskRepository taskRepository;
    
    public TaskResponse createTask(TaskRequest request) {
        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus())
                .dueDate(request.getDueDate())
                .priority(request.getPriority())
                .assigneeId(request.getAssigneeId())
                .build();
        
        Task savedTask = taskRepository.save(task);
        return mapToResponse(savedTask);
    }
    
    @Transactional(readOnly = true)
    public TaskResponse getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
        return mapToResponse(task);
    }
    
    @Transactional(readOnly = true)
    public List<TaskResponse> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public TaskResponse updateTask(Long id, TaskRequest request) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
        
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setDueDate(request.getDueDate());
        task.setPriority(request.getPriority());
        task.setAssigneeId(request.getAssigneeId());
        
        Task updatedTask = taskRepository.save(task);
        return mapToResponse(updatedTask);
    }
    
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new TaskNotFoundException(id);
        }
        taskRepository.deleteById(id);
    }
    
    private TaskResponse mapToResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .dueDate(task.getDueDate())
                .priority(task.getPriority())
                .assigneeId(task.getAssigneeId())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
}

