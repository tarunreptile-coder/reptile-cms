import React, { useCallback, useState, useRef, useMemo } from 'react';
import clsx from 'clsx';
import {
    Divider,
    Tab,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from '@Reptile/Components/Atoms';
import {
    WidgetMenuActions,
    WidgetStyleContainer,
} from '@Reptile/Components/Molecules';
import {
    GlobalStylesPropertyGenerator,
    WidgetPropertyGenerator,
    WidgetsCollection,
} from '@Reptile/Components/Organisms';
import { controlled } from '@Reptile/Framework';
import { useController } from '@Reptile/Hooks';
import {
    TemplateActionsController,
    WidgetSettingsController,
} from '@Reptile/Store/Controllers';

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
import './_TemplateBuilderSidePanel.scss';

const WIDGETS_TABS: ['drag', 'edit', 'globalStyles'] = ['drag', 'edit', 'globalStyles'];

const WIDGETS_INDEX = {
    drag: 0,
    edit: 1,
    globalStyles: 2
};

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

        // Attempt to parse response as JSON first
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            // Assuming the generated text might be in a 'text' or 'response' field, or as a direct JSON value.
            return data.text || data.response || JSON.stringify(data);
        } else {
            // Fallback to plain text if not JSON
            return await response.text();
        }

    } catch (error) {
        // Log the detailed error and return a user-friendly message
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("AI Generation failed:", error);
        return `❌ Sorry, I encountered a critical error while processing your request: ${errorMessage}`;
    }
};

const cameleonAI = false;

const _TemplateBuilderSidePanel = controlled<
    Reptile.Props.TemplateBuilderSidePanelProps,
    Reptile.Controllers.ITemplateBuilderController
>(({ className, style, controller }) => {

    const [isAIAssistantEnabled, setIsAIAssistantEnabled] = useState(true);
    const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai', text: string }>>([
        { sender: 'ai', text: "Hi! How can I help you build or modify your template today?" }
    ]);
    const [currentPrompt, setCurrentPrompt] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // === Controllers ===
    const widgetSettingsController = useController(
        WidgetSettingsController,
        controller,
        controller
    );
    const templateActionsController = useController(TemplateActionsController);

    // === Tab Switching ===
    const handleWidgetsTabSelect = useCallback(
        (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, idx: number) => {
            controller.mode = WIDGETS_TABS[idx];
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

        const newUserMessage = { sender: 'user' as const, text: trimmedPrompt };
        setMessages(prev => [...prev, newUserMessage]);
        setCurrentPrompt('');
        inputRef.current?.focus();

        try {
            const aiResponseText = await chameleonGenerativeFunction(trimmedPrompt);
            const newAIMessage = { sender: 'ai' as const, text: aiResponseText };
            setMessages(prev => [...prev, newAIMessage]);
        } catch (error) {
            console.error("AI Generation failed:", error);
            setMessages(prev => [
                ...prev, 
                { sender: 'ai' as const, text: "❌ Sorry, I encountered an error while processing your request." }
            ]);
        }
    }, [currentPrompt, isAIAssistantEnabled]);

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
                    overflowY: 'auto',
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
                                backgroundColor: msg.sender === 'user' ? 'primary.light' : 'grey.100',
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
    ), [isAIAssistantEnabled, messages, currentPrompt, handleAIToggle, handleSubmit]);

    // === Main Return ===
    return (        
        cameleonAI ? AIPromptingPanel : 
        <div
            className={clsx('rt-template-builder-side-panel', className)}
            style={{ 
                ...style,
                minWidth: '500px',
            }}
        >
            <Text size='extra-large' color='dark-gray'>
                Widget Collection
            </Text>
            <Tabs
                selectedTabIndex={() => WIDGETS_INDEX[controller.mode]}
                onSelect={handleWidgetsTabSelect}
                type='raised'
            >
                <Tab label='Widgets' />
                <Tab label='Style' />
                <Tab label='Global Styles' />
            </Tabs>
            <Divider className='header-divider' />
            <TabPanels activeIndex={() => WIDGETS_INDEX[controller.mode]}>
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
