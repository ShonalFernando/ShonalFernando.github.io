using Microsoft.JSInterop;

namespace MyBlogWeb.Services
{
    public class BrowserService
    {
        private Lazy<IJSObjectReference> _accessorJsRef = new();
        private readonly IJSRuntime _js;

        public BrowserService(IJSRuntime js)
        {
            _js = js;
        }

        private async Task WaitForReference()
        {
            if (_accessorJsRef.IsValueCreated is false)
            {
                _accessorJsRef = new(await _js.InvokeAsync<IJSObjectReference>("import", "/JEssentials.js"));
            }
        }


        public async Task<BrowserDimension> GetDimensions()
        {
            await WaitForReference();
            return await _js.InvokeAsync<BrowserDimension>("getDimensions");
        }

    }

    public class BrowserDimension
    {
        public int Width { get; set; }
        public int Height { get; set; }
    }
}
