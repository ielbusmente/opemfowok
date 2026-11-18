**Short Answer: OpenRouter itself does not give you a "bucket of free tokens."**

OpenRouter is a **router/aggregator**, not a model provider. It sits between you and the actual AI providers (like Meta, Google, Mistral, Anthropic, OpenAI, or third-party hosts like Together.ai, Fireworks, Groq).

### How "Free" works on OpenRouter:

1. **Model-Specific Free Tiers:** Some specific models hosted by providers _via_ OpenRouter offer **free tiers** (usually rate-limited).
 _ Look for models tagged **`:free`** in the model ID (e.g., `meta-llama/llama-3.1-8b-instruct:free`, `google/gemma-2-9b-it:free`, `nvidia/nemotron-3-ultra:free`).
 _ **Limits:** These are set by the _underlying provider_ (e.g., Together.ai, Fireworks, Groq), not OpenRouter. Typical limits are **~50–200 requests per minute** and **~1,000–5,000 requests per day**, with context windows usually capped at 4k–8k tokens (sometimes up to 128k depending on the host).
2. **No Universal "Free Trial Credit":** Unlike OpenAI or Anthropic's direct APIs (which sometimes give $5–$15 free credit on *first signup*), **OpenRouter does not typically give you free dollar credits ($USD) just for signing up.** You must deposit money (min $5 usually) to pay for paid models.
3. **Promotional Credits:** Occasionally, OpenRouter runs promotions (e.g., "Get $1 credit for verifying email" or hackathon sponsorships). Check their **Discord (#announcements)** or **Twitter/X** for current offers.
4. **OpenRouter Markup:** OpenRouter takes a **5–10% markup** on top of the provider's price. For `:free` models, the cost is $0, so the markup is $0.

---

### How to find current free models & limits programmatically:

You can hit their models endpoint to see exactly what is free *right now* and check the `pricing` object (where `prompt: "0"` and `completion: "0"` indicate free).

**Request:**
`bash
curl https://openrouter.ai/api/v1/models
`

**Response snippet for a free model:**
`json
{
  "id": "meta-llama/llama-3.1-8b-instruct:free",
  "name": "Meta: Llama 3.1 8B Instruct (Free)",
  "pricing": {
    "prompt": "0",
    "completion": "0",
    "image": "0",
    "request": "0"
  },
  "context_length": 131072,
  "architecture": { ... },
  "top_provider": { "max_completion_tokens": 8192, "is_moderated": true }
}
`

### Summary Checklist for You:
| Resource | Free Tokens? | How to Access |
| :--- | :--- | :--- |
| **OpenRouter Account Balance** | **No** (usually $0 starting balance) | N/A (Must deposit $5+ for paid models) |
| **`:free` Models (Llama, Gemma, Nemotron, etc.)** | **Yes (Unlimited* tokens)** | Use model ID ending in `:free` (e.g. `meta-llama/llama-3.1-8b-instruct:free`) |
| **Rate Limits on Free Models** | **Strict RPM/TPM/DPM\*\* | Defined by host (Together, Fireworks, Groq, etc.). Check `top_provider` in `/models` endpoint. |

*\_ "Unlimited" tokens means no dollar cost, but you are heavily rate-limited (Requests Per Minute / Day). You cannot run high-volume production workloads on the free tier._

### Recommendation:
1. Go to **[openrouter.ai/models](https://openrouter.ai/models)**.
2. Filter by **"Free"** (toggle in top right or search `:free`).
3. Click a model -> Check the **"Providers"** tab to see _who_ is hosting it (Together, Fireworks, Groq, etc.) and their specific rate limit docs.
