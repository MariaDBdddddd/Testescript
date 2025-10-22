local Player = game.Players.LocalPlayer
local Mouse = Player:GetMouse()

-- Cria o Frame do Menu de Key
local KeyMenu = Instance.new("Frame")
KeyMenu.Name = "KeyMenu"
KeyMenu.Parent = Player.PlayerGui
KeyMenu.Size = UDim2.new(0.5, 0, 0.5, 0)
KeyMenu.Position = UDim2.new(0.25, 0, 0.25, 0)
KeyMenu.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
KeyMenu.BorderSizePixel = 0

-- Cria o TextLabel do Título do Menu de Key
local KeyTitle = Instance.new("TextLabel")
KeyTitle.Name = "KeyTitle"
KeyTitle.Parent = KeyMenu
KeyTitle.Text = "Menu de Key"
KeyTitle.Font = Enum.Font.SourceSansBold
KeyTitle.FontSize = Enum.FontSize.Size24
KeyTitle.TextColor3 = Color3.fromRGB(255, 255, 255)
KeyTitle.Size = UDim2.new(1, 0, 0.1, 0)
KeyTitle.BackgroundTransparency = 1
KeyTitle.Position = UDim2.new(0, 0, 0, 0)

-- Cria o TextButton do Botão do Menu de Key
local KeyButton = Instance.new("TextButton")
KeyButton.Name = "KeyButton"
KeyButton.Parent = KeyMenu
KeyButton.Text = "Botão Bonito"
KeyButton.Font = Enum.Font.SourceSansBold
KeyButton.FontSize = Enum.FontSize.Size18
KeyButton.TextColor3 = Color3.fromRGB(255, 255, 255)
KeyButton.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
KeyButton.BorderSizePixel = 0
KeyButton.Size = UDim2.new(1, 0, 0.2, 0)
KeyButton.Position = UDim2.new(0, 0, 0.1, 0)

-- Cria o TextBox da Key do Menu de Key
local KeyBox = Instance.new("TextBox")
KeyBox.Name = "KeyBox"
KeyBox.Parent = KeyMenu
KeyBox.PlaceholderText = "Insira a Key"
KeyBox.Font = Enum.Font.SourceSansBold
KeyBox.FontSize = Enum.FontSize.Size18
KeyBox.TextColor3 = Color3.fromRGB(255, 255, 255)
KeyBox.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
KeyBox.BorderSizePixel = 0
KeyBox.Size = UDim2.new(1, 0, 0.2, 0)
KeyBox.Position = UDim2.new(0, 0, 0.3, 0)

-- Script para verificar a Key
KeyButton.MouseButton1Click:Connect(function()
    local InputKey = KeyBox.Text
    if InputKey == "TESTE" then
        -- Ação quando a Key estiver correta
        print("Key correta!")
        -- Chama o menu de Speed e Jump
        require(script.Parent.SpeedJumpMenu)
    else
        -- Ação quando a Key estiver incorreta
        print("Key incorreta!")
    end
end)
