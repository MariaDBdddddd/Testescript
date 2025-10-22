local Player = game.Players.LocalPlayer
local Mouse = Player:GetMouse()

-- Cria o Frame do Menu de Speed e Jump
local SpeedJumpMenu = Instance.new("Frame")
SpeedJumpMenu.Name = "SpeedJumpMenu"
SpeedJumpMenu.Parent = Player.PlayerGui
SpeedJumpMenu.Size = UDim2.new(0.5, 0, 0.5, 0)
SpeedJumpMenu.Position = UDim2.new(0.25, 0, 0.25, 0)
SpeedJumpMenu.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
SpeedJumpMenu.BorderSizePixel = 0

-- Cria o TextLabel do Título do Menu de Speed e Jump
local SpeedJumpTitle = Instance.new("TextLabel")
SpeedJumpTitle.Name = "SpeedJumpTitle"
SpeedJumpTitle.Parent = SpeedJumpMenu
SpeedJumpTitle.Text = "Menu de Speed e Jump"
SpeedJumpTitle.Font = Enum.Font.SourceSansBold
SpeedJumpTitle.FontSize = Enum.FontSize.Size24
SpeedJumpTitle.TextColor3 = Color3.fromRGB(255, 255, 255)
SpeedJumpTitle.Size = UDim2.new(1, 0, 0.1, 0)
SpeedJumpTitle.BackgroundTransparency = 1
SpeedJumpTitle.Position = UDim2.new(0, 0, 0, 0)

-- Cria o TextButton do Botão de Speed
local SpeedButton = Instance.new("TextButton")
SpeedButton.Name = "SpeedButton"
SpeedButton.Parent = SpeedJumpMenu
SpeedButton.Text = "Speed"
SpeedButton.Font = Enum.Font.SourceSansBold
SpeedButton.FontSize = Enum.FontSize.Size18
SpeedButton.TextColor3 = Color3.fromRGB(255, 255, 255)
SpeedButton.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
SpeedButton.BorderSizePixel = 0
SpeedButton.Size = UDim2.new(1, 0, 0.2, 0)
SpeedButton.Position = UDim2.new(0, 0, 0.1, 0)

-- Cria o TextButton do Botão de Jump
local JumpButton = Instance.new("TextButton")
JumpButton.Name = "JumpButton"
JumpButton.Parent = SpeedJumpMenu
JumpButton.Text = "Jump"
JumpButton.Font = Enum.Font.SourceSansBold
JumpButton.FontSize = Enum.FontSize.Size18
JumpButton.TextColor3 = Color3.fromRGB(255, 255, 255)
JumpButton.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
JumpButton.BorderSizePixel = 0
JumpButton.Size = UDim2.new(1, 0, 0.2, 0)
JumpButton.Position = UDim2.new(0, 0, 0.3, 0)

-- Script para aumentar o Speed
SpeedButton.MouseButton1Click:Connect(function()
    Player.Character.Humanoid.WalkSpeed = Player.Character.Humanoid.WalkSpeed + 10
end)

-- Script para aumentar o Jump
JumpButton.MouseButton1Click:Connect(function()
    Player.Character.Humanoid.JumpPower = Player.Character.Humanoid.JumpPower + 10
end)
