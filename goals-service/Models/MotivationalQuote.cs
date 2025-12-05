using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace goals_service.Models;

public class MotivationalQuote
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    
    [BsonElement("text")]
    public string Text { get; set; } = string.Empty;
    
    [BsonElement("author")]
    public string? Author { get; set; }
    
    [BsonElement("category")]
    public string? Category { get; set; }
}

