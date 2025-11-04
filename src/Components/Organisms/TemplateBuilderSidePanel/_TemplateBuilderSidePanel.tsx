import React, { useCallback, useState, useRef, useMemo } from 'react';
import clsx from 'clsx';
import { toJS } from "mobx";
// --- MOCKS FOR @Reptile/Components, @Reptile/Framework, and Controllers ---

// Mocking @Reptile/Framework & @Reptile/Hooks
/** Mock HOC for framework control. Simply passes props through. */
const controlled = (Component) => (props) => <Component {...props} />;
/** Mock hook. Returns the first argument passed to it (the controller). */
const useController = (Controller, ...args) => args[0] || {}; 

// Mocking Controllers (used for typing purposes only here)
const TemplateActionsController = {};
const WidgetSettingsController = {};

// Mocking @Reptile/Components/Atoms
const Text = ({ children, size, color, ...props }) => (
    <span 
        style={{
            fontSize: size === 'extra-large' ? '1.25rem' : (size === 'small' ? '0.875rem' : '1rem'), 
            color: color === 'dark-gray' ? '#333' : 'inherit',
            ...props.style
        }} 
        {...props}
    >
        {children}
    </span>
);
const Divider = ({ className }) => <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #ccc' }} className={className} />;
const Tab = ({ label }) => <div style={{ padding: '8px 12px' }}>{label}</div>;
const TabPanel = ({ children }) => <div>{children}</div>;

// Mocking complex components like Tabs and TabPanels
const Tabs = ({ selectedTabIndex, onSelect, children, type }) => {
    const activeIndex = selectedTabIndex();
    return (
        <div style={{ display: 'flex', borderBottom: '1px solid #ddd' }}>
            {React.Children.map(children, (child, index) => (
                <div 
                    onClick={(e) => onSelect(e, index)}
                    style={{ 
                        padding: '10px 15px', 
                        cursor: 'pointer', 
                        borderBottom: index === activeIndex ? '2px solid #1976d2' : 'none',
                        fontWeight: index === activeIndex ? '600' : 'normal',
                        backgroundColor: type === 'raised' && index === activeIndex ? '#f0f0f0' : 'transparent',
                        borderRadius: '4px 4px 0 0'
                    }}
                >
                    {child.props.label}
                </div>
            ))}
        </div>
    );
};

const TabPanels = ({ activeIndex, children }) => {
    const activeIdx = activeIndex();
    return (
        <div style={{ paddingTop: '10px' }}>
            {React.Children.map(children, (child, index) => (
                <div style={{ display: index === activeIdx ? 'block' : 'none' }}>
                    {child}
                </div>
            ))}
        </div>
    );
};

// Mocking @Reptile/Components/Molecules & @Reptile/Components/Organisms
const WidgetMenuActions = ({ controller }) => <div style={{ marginTop: '16px', borderTop: '1px solid #eee', paddingTop: '16px', textAlign: 'center' }}>{/* Mock Template Actions */}</div>;
const WidgetStyleContainer = ({ children }) => <div style={{ padding: '8px' }}>{children}</div>;
const GlobalStylesPropertyGenerator = () => <div style={{padding: '16px', border: '1px dashed #ccc'}}>Global Styles Generator (Mock)</div>;
const WidgetPropertyGenerator = () => <div style={{padding: '16px', border: '1px dashed #ccc'}}>Widget Property Generator (Mock)</div>;
const WidgetsCollection = () => <div style={{padding: '16px', border: '1px dashed #ccc'}}>Widgets Collection (Mock)</div>;

// --- END MOCKS ---

// --- MUI Imports for the AI Prompting Interface ---
import { 
    Box, 
    TextField, 
    IconButton, 
    Switch,           
    FormControlLabel, 
    Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
// Removed: import './_TemplateBuilderSidePanel.scss';

const WIDGETS_TABS: ['drag', 'edit', 'globalStyles'] = ['drag', 'edit', 'globalStyles'];

const WIDGETS_INDEX = {
    drag: 0,
    edit: 1,
    globalStyles: 2
};

// Assuming the API returns a JSON string or structure that represents the widget array.
const chameleonGenerativeFunction = async (prompt: string): Promise<string> => {
    console.log(`Chameleon AI triggered with prompt: "${prompt}"`);
    
    try {
        const response = await fetch('https://ypl52vubhqazcekaiffjsilvmm0etlcn.lambda-url.us-east-1.on.aws/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Send the prompt in the required JSON body format
            body: JSON.stringify({ prompt: prompt }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`API returned status ${response.status}: ${errorBody.substring(0, 100)}...`);
        }

        // Return the response body as text, which we will parse later in handleSubmit
        return await response.text(); 

    } catch (error) {
        // Log the detailed error and return a user-friendly message
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("AI Generation failed:", error);
        // Return a special error message that handleSubmit can display
        return `❌ Sorry, I encountered a critical error while processing your request: ${errorMessage}`;
    }
};

const cameleonAI = true; // CHANGED to true to enable the AI assistant view

// Dummy types to satisfy the component signature after removing external types
type TemplateBuilderSidePanelProps = any;
type ITemplateBuilderController = any;

const _TemplateBuilderSidePanel = controlled<
    TemplateBuilderSidePanelProps,
    ITemplateBuilderController
>(({ className, style, controller }) => {

    const [isAIAssistantEnabled, setIsAIAssistantEnabled] = useState(true);
    const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai', text: string, type: 'text' | 'json_attempt' }>>([
        { sender: 'ai', text: "Hi! How can I help you build or modify your template today? Try asking for a 'hero section with a title and a button'.", type: 'text' }
    ]);
    const [currentPrompt, setCurrentPrompt] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // === Controllers ===
    // Use controller as is since useController is mocked to return controller
    const widgetSettingsController = useController(
        WidgetSettingsController,
        controller,
        controller
    );
    const templateActionsController = useController(TemplateActionsController);

    // === Tab Switching ===
    const handleWidgetsTabSelect = useCallback(
        (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, idx: number) => {
            // Need a guard since controller is mocked to any/{}
            if (controller && typeof controller.mode !== 'undefined') {
                controller.mode = WIDGETS_TABS[idx];
            }
        },
        [controller]
    );

    // === Toggle AI Assistant ===
    const handleAIToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAIAssistantEnabled(event.target.checked);
    };

    // === Handle AI Prompt Submission ===
    const handleSubmit = useCallback(async () => {
        const trimmedPrompt = currentPrompt.trim();
        if (!trimmedPrompt || !isAIAssistantEnabled) return;

        const newUserMessage = { sender: 'user' as const, text: trimmedPrompt, type: 'text' as const };
        setMessages(prev => [...prev, newUserMessage]);
        setCurrentPrompt('');
        inputRef.current?.focus();

        let aiResponseText: string;
        try {
            // 1. Fetch the raw response (expecting a JSON string of the widget array)
            aiResponseText = await chameleonGenerativeFunction(trimmedPrompt);

            if (aiResponseText.startsWith('❌')) {
                 // Display API error message directly
                setMessages(prev => [...prev, { sender: 'ai' as const, text: aiResponseText, type: 'text' }]);
                return;
            }

            // 2. Attempt to parse the response text as JSON (the array of widgets)
            let parsedJson;
            try {
                parsedJson = JSON.parse(aiResponseText);
            } catch (e) {
                // If parsing fails, treat it as a conversational response.
                const newAIMessage = { 
                    sender: 'ai' as const, 
                    text: `I couldn't parse that as a structure. Here's the raw response: ${aiResponseText.substring(0, 200)}...`, 
                    type: 'text' as const 
                };
                setMessages(prev => [...prev, newAIMessage]);
                console.error("Failed to parse AI response as JSON:", e);
                return;
            }

            // 3. If successfully parsed as an Array, update the MobX store
            if (Array.isArray(parsedJson)) {
                try {
                    // ✅ Primary path: proper controller method
                    if (controller && typeof controller.loadWidgetsFromJson === 'function') {
                        controller.loadWidgetsFromJson(parsedJson);
                        console.log("✅ Widgets successfully loaded via controller.loadWidgetsFromJson");
                    } 
                    // 🧩 Fallback: directly update observable array if method missing
                    else if (controller && controller.widgets) {
                        (controller as any).widgets.replace?.(parsedJson) || ((controller as any).widgets = parsedJson);
                        console.warn("⚠️ loadWidgetsFromJson() not found — widgets assigned directly to controller.widgets");
                    } 
                    // 🚨 Safety: if controller undefined
                    else {
                        console.error("❌ Controller unavailable, cannot update widgets");
                    }
            
                    // 🧱 Debug: show the store state after update
                    console.log("🧱 Updated Widgets:", toJS(controller.widgets));
            
                } catch (err) {
                    console.error("❌ Failed to update widgets:", err);
                }
            }

        } catch (error) {
            console.error("AI Generation failed:", error);
            setMessages(prev => [
                ...prev, 
                { sender: 'ai' as const, text: "❌ Sorry, I encountered an unhandled critical error.", type: 'text' }
            ]);
        }
    }, [currentPrompt, isAIAssistantEnabled, controller]); // Include controller in deps for useCallback

    // === Inline Memoized AI Panel ===
    const AIPromptingPanel = useMemo(() => (
        <Box 
            sx={{
                minWidth: '500px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                p: 2,
            }}
        >
            {/* Header with Switch */}
            <Box 
                sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    pb: 1,
                    borderBottom: '1px solid #eee'
                }}
            >
                <Text size='extra-large' color='dark-gray'>
                    Cameleon AI Assistant
                </Text>
                <FormControlLabel
                    control={
                        <Switch 
                            checked={isAIAssistantEnabled} 
                            onChange={handleAIToggle}
                            name="aiEnabled"
                            color="primary"
                        />
                    }
                    label={isAIAssistantEnabled ? 'Enabled' : 'Disabled'}
                    labelPlacement="start"
                    sx={{ m: 0 }}
                />
            </Box>

            {/* Chat Messages */}
            <Box 
                sx={{
                    overflowY: 'auto', 
                    flexGrow: 1,
                    mb: 2,
                    maxHeight: '75vh',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    opacity: isAIAssistantEnabled ? 1 : 0.5,
                    pointerEvents: isAIAssistantEnabled ? 'auto' : 'none',
                }}
            >
                {messages.map((msg, index) => (
                    <Box 
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        }}
                    >
                        <Paper 
                            sx={{
                                maxWidth: '80%',
                                p: 1,
                                borderRadius: 3,
                                // Differentiate chat bubble color based on the message type
                                backgroundColor: msg.sender === 'user' 
                                    ? 'primary.main' // Changed to primary.main for better contrast
                                    : (msg.type === 'json_attempt' ? 'success.light' : 'grey.100'),
                                color: msg.sender === 'user' ? 'white' : 'text.primary',
                            }}
                        >
                            <Text size="small">{msg.text}</Text>
                        </Paper>
                    </Box>
                ))}
            </Box>

            {/* Input + Send */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    borderTop: '1px solid #eee',
                    pt: 2,
                    opacity: isAIAssistantEnabled ? 1 : 0.5,
                    pointerEvents: isAIAssistantEnabled ? 'auto' : 'none',
                }}
            >
                <TextField
                    inputRef={inputRef}
                    fullWidth
                    variant="outlined"
                    placeholder="Ask the AI to generate or modify content..."
                    size="small"
                    value={currentPrompt}
                    onChange={(e) => setCurrentPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                    disabled={!isAIAssistantEnabled}
                />
                <IconButton 
                    color="primary"
                    aria-label="send prompt"
                    onClick={handleSubmit}
                    disabled={!isAIAssistantEnabled || !currentPrompt.trim()}
                >
                    <SendIcon />
                </IconButton>
            </Box>
            <WidgetMenuActions controller={templateActionsController} />
        </Box>
    ), [isAIAssistantEnabled, messages, currentPrompt, handleAIToggle, handleSubmit, templateActionsController]);

    // === Main Return ===
    return (        
        cameleonAI ? AIPromptingPanel : 
        <div
            className={clsx('rt-template-builder-side-panel', className)}
            style={{ 
                ...style,
                minWidth: '500px',
                padding: '16px',
                borderLeft: '1px solid #eee'
            }}
        >
            <Text size='extra-large' color='dark-gray' style={{ display: 'block', marginBottom: '16px' }}>
                Widget Collection
            </Text>
            <Tabs
                selectedTabIndex={() => controller.mode ? WIDGETS_INDEX[controller.mode] : 0}
                onSelect={handleWidgetsTabSelect}
                type='raised'
            >
                <Tab label='Widgets' />
                <Tab label='Style' />
                <Tab label='Global Styles' />
            </Tabs>
            <Divider className='header-divider' />
            <TabPanels activeIndex={() => controller.mode ? WIDGETS_INDEX[controller.mode] : 0}>
                <TabPanel>
                    <WidgetsCollection controller={controller} />
                </TabPanel>
                <TabPanel>
                    <WidgetStyleContainer>
                        <WidgetPropertyGenerator controller={widgetSettingsController} />
                    </WidgetStyleContainer>
                </TabPanel>
                <TabPanel>
                    <WidgetStyleContainer>
                        <GlobalStylesPropertyGenerator
                            masterStyles={controller.masterStyles}
                            controller={widgetSettingsController}
                        />
                    </WidgetStyleContainer>
                </TabPanel>
            </TabPanels>
            <Divider className='action-divider' />
            <WidgetMenuActions controller={templateActionsController} />
        </div>
    );
});

export default _TemplateBuilderSidePanel;
