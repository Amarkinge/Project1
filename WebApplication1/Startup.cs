
    using Microsoft.EntityFrameworkCore;
    using WebApplication1.Data;

namespace WebApplication1
{
    public class Startup
        {

            public Startup(IConfiguration configuration)
            {
                Configuration = configuration;
            }

            public IConfiguration Configuration { get; set; }

            public void ConfigureServices(IServiceCollection services)
            {
                services.AddCors(options =>
                {
                    options.AddDefaultPolicy(builder =>
                    {
                        builder.WithOrigins("http://localhost:5020/swagger/index.html") // Adjust this to match your frontend's URL
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                    });
                });

                services.AddDbContext<AppDbContext>(options =>
                {
                    var connectionString = "server=localhost;database=busrental;uid=root;password=Pankaj@123";
                    var serverVersion = new MySqlServerVersion(new Version(8, 0, 34));
                    options.UseMySql(connectionString, serverVersion);
                });

                services.AddControllers();
            
            }

            public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
            {
                app.UseCors();

                app.UseRouting();

                if (env.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                }
                else
                {
                    app.UseExceptionHandler("/Home/Error");
                    app.UseHsts();
                }

                app.UseHttpsRedirection();
                app.UseStaticFiles();
                app.UseRouting();
                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                });
            }
        }
    }


