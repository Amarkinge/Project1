using System;
using WebApplication1.Data;
using WebApplication1.Migrations;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:5020/swagger/index.html") // Adjust this to match your frontend's URL
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapControllers();
app.MapFallbackToFile("index.html");
app.UseCors();
app.Run();
