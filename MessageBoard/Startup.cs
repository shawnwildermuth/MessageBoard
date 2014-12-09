using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MessageBoard.Startup))]
namespace MessageBoard
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
